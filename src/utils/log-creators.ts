import { IErrorLog, IMessageLog } from './logger'
import chalk from 'chalk'

interface IRequestHeaders {
  headers: { [name: string]: string }
}

interface IResponseHeaders {
  headers: { [name: string]: string }
}

interface IRequest {
  id: string
  timestamp: number
  method: string
  url: string
}

interface IResponse {
  id: string
  timestamp: number
  code: number
  status: string
  elapsed: number
}

export function createErrorLogFromError({ id, timestamp, elapsed, error }: IErrorLog): IErrorLog {
  return { id, timestamp, elapsed, error }
}

export function createMessageLogFromRequest({ id, timestamp, method, url }: IRequest): IMessageLog {
  return {
    id
  , timestamp
  , message: `${chalk.blue(method)} ${url}`
  }
}

export function createMessageLogFromResponse({ id, timestamp, code, status, elapsed }: IResponse): IMessageLog {
  return {
    id
  , timestamp
  , elapsed
  , message: `${formatStatusCode(status, code)}`
  }
}

export function createMessageLogFromRequestHeaders({ headers }: IRequestHeaders): IMessageLog {
  const messages = Object.entries(headers)
    .map(([name, value]) => `${chalk.cyan(name)}: ${value}`)
  return { message: messages }
}

export function createMessageLogFromResponseHeaders({ headers }: IResponseHeaders): IMessageLog {
  const messages = Object.entries(headers)
    .map(([name, value]) => `${chalk.cyan(name)}: ${value}`)
  return { message: messages }
}

function formatStatusCode(status: string, code: number): string {
  let color = (x: string) => x
  if (code >= 200 && code < 300) color = chalk.green
  if (code >= 400 && code < 500) color = chalk.red
  if (code >= 500) color = chalk.yellow

  return color(`${code} ${status}`)
}
