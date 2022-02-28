import {
  fetch as nodeFetch
, RequestInfo as NodeRequestInfo
, RequestInit as NodeRequestInit
, Request as NodeRequest
} from 'undici'
import { LEVEL } from '@utils/env'
import { getErrorResultPromise } from 'return-style'
import { Logger, TerminalTransport } from 'extra-logger'
import fromPairs from 'lodash.frompairs'
import { toArray } from 'iterable-operator'
import chalk from 'chalk'
import { lazy } from 'extra-lazy'

const getLogger = lazy(() => new Logger({
  level: LEVEL()
, transport: new TerminalTransport({})
}))

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const logger = getLogger()
  const nodeInput: NodeRequestInfo = input as NodeRequestInfo
  const nodeInit: NodeRequestInit = init as NodeRequestInit | undefined ?? {}

  const req = new NodeRequest(nodeInput, nodeInit)
  const startTime = Date.now()

  logger.info(`${formatMethod(req.method)} ${req.url}`)
  logger.trace(getRequestHeaders)

  const [err, res] = await getErrorResultPromise(nodeFetch(req))
  if (err) {
    logger.error(`${err}`)
    throw err
  }
  logger.info(`${formatStatusCode(res!.statusText, res!.status)}`, getElapsed(startTime))
  logger.trace(getResponseHeaders)

  return res as unknown as Response

  function getRequestHeaders() {
    const headers = fromPairs(toArray(req.headers.entries()))
    const messages = Object.entries(headers)
      .map(([name, value]) => `${chalk.cyan(name)}: ${value}`)
    return messages.join('\n')
  }

  function getResponseHeaders() {
    const headers = fromPairs(toArray(res!.headers.entries()))
    const messages = Object.entries(headers)
      .map(([name, value]) => `${chalk.cyan(name)}: ${value}`)
    return messages.join('\n')
  }
}

function formatMethod(method: string): string {
  return chalk.blue(method)
}

function getElapsed(startTime: number): number {
  return Date.now() - startTime
}

function formatStatusCode(status: string, code: number): string {
  const text = `${code} ${status}`
  if (code >= 200 && code < 300) return chalk.green(text)
  if (code >= 400 && code < 500) return chalk.red(text)
  if (code >= 500) return chalk.yellow(text)
  return text
}
