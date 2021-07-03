import { Level } from 'extra-logger'
import { ValueGetter } from 'value-getter'
import { Getter } from 'justypes'

const cache = new WeakMap()

export const LEVEL: Getter<Level> = new ValueGetter(() => process.env.EXTRA_FETCH_LOG)
  .convert(val => {
    if (val) {
      switch (val.toLowerCase()) {
        case 'trace': return Level.Trace
        case 'debug': return Level.Debug
        case 'info': return Level.Info
        case 'warn': return Level.Warn
        case 'error': return Level.Error
        case 'fatal': return Level.Fatal
      }
    }

    return Level.None
  })
  .memoize(cache)
  .get()
