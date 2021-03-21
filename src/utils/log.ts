import chalk from 'chalk'

export interface IRequestTrace {
  headers: { [name: string]: string }
}

export interface IResponseTrace {
  headers: { [name: string]: string }
}

export interface IRequestInfo {
  id: string
  timestamp: number
  method: string
  url: string
}

export interface IResponseInfo {
  id: string
  timestamp: number
  code: number
  status: string
  elapsed: number
}

export interface IFetchError {
  id: string
  timestamp: number
  elapsed: number
  error: Error
}

export function logFetchError({ id, timestamp, elapsed, error }: IFetchError): void {
  console.error(`[${formatDate(timestamp)}] #${id} ${elapsed}ms`, error)
}

export function logRequestInfo({ id, timestamp, method, url }: IRequestInfo): void {
  console.info(`[${formatDate(timestamp)}] #${id} ${chalk.blue(method)} ${url}`)
}

export function logResponseInfo({ id, timestamp, code, status, elapsed }: IResponseInfo): void {
  console.info(`[${formatDate(timestamp)}] #${id} ${formatStatusCode(status, code)} ${elapsed}ms`)
}

export function logRequestTrace({ headers }: IRequestTrace): void {
  console.group()
  for (const [name, value] of Object.entries(headers)) {
    console.info(`${chalk.cyan(name)}: ${value}`)
  }
  console.groupEnd()
}

export function logResponseTrace({ headers }: IResponseTrace): void {
  console.group()
  for (const [name, value] of Object.entries(headers)) {
    console.info(`${chalk.cyan(name)}: ${value}`)
  }
  console.groupEnd()
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

function formatStatusCode(status: string, code: number): string {
  let color = (x: string) => x
  if (code >= 200 && code < 300) color = chalk.green
  if (code >= 400 && code < 500) color = chalk.red
  if (code >= 500) color = chalk.yellow

  return color(`${code} ${status}`)
}
