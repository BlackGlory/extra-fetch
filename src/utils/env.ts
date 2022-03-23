import { Level, stringToLevel } from 'extra-logger'
import { ValueGetter } from 'value-getter'
import { Getter } from 'justypes'

const cache = new WeakMap()

export const LEVEL: Getter<Level> = new ValueGetter(env('EXTRA_FETCH_LOG'))
  .convert(val => stringToLevel(val ?? ''))
  .memoize(cache)
  .get()

function env(name: string): () => string | undefined {
  return () => process.env[name]
}
