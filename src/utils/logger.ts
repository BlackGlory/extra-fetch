import { createLogger, Level } from 'extra-logger'
import { LEVEL } from '@utils/env'
import { isArray, isntUndefined } from '@blackglory/types'

export interface IMessageLog {
  id?: string
  timestamp?: number
  message: string | string[]
  elapsed?: number
}

export interface IErrorLog {
  id?: string
  timestamp?: number
  error: Error
  elapsed?: number
}

interface IPrefix {
  level: Level
  timestamp?: number
  id?: string
}

export const logger = createLogger(LEVEL, {
  [Level.Trace]: printMessage(Level.Trace, console.log)
, [Level.Debug]: printMessage(Level.Debug, console.log)
, [Level.Info]: printMessage(Level.Info, console.info)
, [Level.Warn]: printMessage(Level.Warn, console.warn)
, [Level.Error]: printError(Level.Error, console.error)
, [Level.Fatal]: printError(Level.Fatal, console.error)
})

function printMessage(
  level: Level
, log: (...args: unknown[]) => void
): (log: IMessageLog) => void {
  return ({ id, timestamp, elapsed, message }: IMessageLog) => {
    const pre = createPrefix({ timestamp, id, level })
    const post = isntUndefined(elapsed) ? createPostfix({ elapsed }) : null

    if (isArray(message)) {
      let result = `${pre}`
      if (post) result += ' ' + post

      log(result)
      console.group()
      message.forEach(x => log(x))
      console.groupEnd()
    } else {
      let result = `${pre} ${message}`
      if (post) result += ' ' + post

      log(result)
    }
  }
}

function printError(
  level: Level
, log: (...args: unknown[]) => void
): (error: IErrorLog) => void {
  return ({ id, timestamp, elapsed, error }: IErrorLog) => {
    let result = createPrefix({ timestamp, id, level })
    if (isntUndefined(elapsed)) {
      result += ` ${createPostfix({ elapsed })}`
    }

    log(result, error)
  }
}

function createPrefix({ level, timestamp, id }: IPrefix): string {
  let result = `[${levelToString(level).toUpperCase()}]`
  if (isntUndefined(timestamp)) {
    result += `[${formatDate(timestamp)}]`
  }
  if (isntUndefined(id)) {
    result += ` #${id}`
  }
  return result
}

function createPostfix({ elapsed }: { elapsed: number }): string {
  return `${elapsed}ms`
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

function levelToString(level: Level): string {
  switch (level) {
    case Level.Info: return 'Info'
    case Level.Debug: return 'Debug'
    case Level.Warn: return 'Warn'
    case Level.Trace: return 'Trace'
    case Level.Error: return 'Error'
    case Level.Fatal: return 'Fatal'
    default: return 'None'
  }
}
