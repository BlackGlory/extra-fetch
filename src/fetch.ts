import * as http from 'http'
import * as https from 'https'
import nodeFetch from 'node-fetch'
import {
  RequestInfo as NodeRequestInfo
, RequestInit as NodeRequestInit
, Request as NodeRequest
} from 'node-fetch'
import { getErrorResultPromise } from 'return-style'
import {
  IRequestInfo
, IResponseInfo
, IRequestTrace
, IResponseTrace
, IFetchError
, logRequestInfo
, logResponseInfo
, logRequestTrace
, logResponseTrace
, logFetchError
} from '@utils/log'
import { countup } from '@utils/countup'
import { createLogger } from 'extra-logger'
import { LEVEL } from '@utils/env'
import 'core-js/es/object'

const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })
const log = createLogger(LEVEL)

function getCustomAgent(parsedURL: URL) {
  return parsedURL.protocol == 'http:' ? httpAgent : httpsAgent
}

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const nodeInput: NodeRequestInfo = input as NodeRequestInfo
  const nodeInit: NodeRequestInit = init as NodeRequestInit | undefined ?? {}

  // handle keepalive in RequstInfo
  if (typeof input === 'object' && input.keepalive) {
    nodeInit.agent = getCustomAgent
  }

  // handle keepalive in RequestInit
  if (init?.keepalive) {
    nodeInit.agent = getCustomAgent
  }

  // prefetch logging
  const id = countup().toString()
  const req = new NodeRequest(nodeInput, nodeInit)
  const startTime = Date.now()
  log.info(collectRequestInfo, logRequestInfo)
  log.trace(collectRequestTrace, logRequestTrace)

  // fetch
  const [err, res] = await getErrorResultPromise(
    nodeFetch(req) as unknown as Promise<Response>
  )

  // postfetch logging
  if (err) {
    log.error(collectFetchError, logFetchError)
    throw err
  }
  log.info(collectResponseInfo, logResponseInfo)
  log.trace(collectResponseTrace, logResponseTrace)

  return res!

  function collectFetchError(): IFetchError {
    const timestamp = Date.now()

    return {
      id
    , timestamp
    , elapsed: timestamp - startTime
    , error: err!
    }
  }

  function collectRequestInfo(): IRequestInfo {
    return {
      id
    , timestamp: startTime
    , method: req.method
    , url: req.url
    }
  }

  function collectResponseInfo(): IResponseInfo {
    const timestamp = Date.now()

    return {
      id
    , timestamp
    , code: res!.status
    , status: res!.statusText
    , elapsed: timestamp - startTime
    }
  }

  function collectRequestTrace(): IRequestTrace {
    const headers = Object.fromEntries(req.headers.entries())

    return { headers }
  }

  function collectResponseTrace(): IResponseTrace {
    const headers = Object.fromEntries(res!.headers.entries())

    return { headers }
  }
}
