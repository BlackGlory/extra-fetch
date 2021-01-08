import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import alias from '@rollup/plugin-alias'

const UMD_NAME = 'ExtraFetch'

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]

function createOptions({ directory, target }) {
  const commonPlugins = [
    alias({
      entries: [
        { find: '@utils/fetch', replacement: '@utils/fetch.browser' }
      , { find: '@utils/headers', replacement: '@utils/headers.browser' }
      , { find: '@utils/request', replacement: '@utils/request.browser' }
      , { find: '@utils/response', replacement: '@utils/response.browser' }
      , { find: '@utils/form-data', replacement: '@utils/form-data.browser' }
      , { find: '@utils/abort-controller', replacement: '@utils/abort-controller.browser' }
      , { find: '@utils/blob', replacement: '@utils/blob.browser' }
      ]
    })
  , typescript({ target })
  , json()
  , resolve({ browser: true })
  , commonjs()
  ]

  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  ]

  function createOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createMinification(name) {
    return [
      {
        file: `dist/${directory}/${name}.min.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.min.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }
}
