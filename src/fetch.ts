import {
  fetch as nodeFetch
, RequestInfo as NodeRequestInfo
, RequestInit as NodeRequestInit
, Request as NodeRequest
} from 'undici'
import { getErrorResultPromise } from 'return-style'
import { logger } from '@utils/logger'
import {
  createMessageLogFromRequest
, createMessageLogFromResponse
, createMessageLogFromRequestHeaders
, createMessageLogFromResponseHeaders
, createErrorLogFromError
} from '@utils/log-creators'
import { countup } from '@utils/countup'
import fromPairs from 'lodash.frompairs'
import { toArray } from 'iterable-operator'

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const nodeInput: NodeRequestInfo = input as NodeRequestInfo
  const nodeInit: NodeRequestInit = init as NodeRequestInit | undefined ?? {}

  const req = new NodeRequest(nodeInput, nodeInit)

  const id = countup().toString()
  const startTime = Date.now()

  // prefetch logging
  logger.info(collectRequest, createMessageLogFromRequest)
  logger.trace(collectRequestHeaders, createMessageLogFromRequestHeaders)

  // fetch
  const [err, res] = await getErrorResultPromise(
    nodeFetch(req) as unknown as Promise<Response>
  )

  // postfetch logging
  if (err) {
    logger.error(collectError, createErrorLogFromError)
    throw err
  }
  logger.info(collectResponse, createMessageLogFromResponse)
  logger.trace(collectResponseHeaders, createMessageLogFromResponseHeaders)

  return res!

  function collectError() {
    const timestamp = Date.now()
    return {
      id
    , timestamp
    , elapsed: timestamp - startTime
    , error: err!
    }
  }

  function collectRequest() {
    return {
      id
    , timestamp: startTime
    , method: req.method
    , url: req.url
    }
  }

  function collectResponse() {
    const timestamp = Date.now()
    return {
      id
    , timestamp
    , code: res!.status
    , status: res!.statusText
    , elapsed: timestamp - startTime
    }
  }

  function collectRequestHeaders() {
    const headers = fromPairs(toArray(req.headers.entries()))
    return { headers }
  }

  function collectResponseHeaders() {
    const headers = fromPairs(toArray(res!.headers.entries()))
    return { headers }
  }
}
