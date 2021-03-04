import * as http from 'http'
import * as https from 'https'
import nodeFetch from 'node-fetch'
import {
  RequestInfo as NodeRequestInfo
, RequestInit as NodeRequestInit
} from 'node-fetch'

const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })

export function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const nodeInput: NodeRequestInfo = input as NodeRequestInfo
  const nodeInit: NodeRequestInit = {
    ...init as NodeRequestInit | undefined ?? {}
  , agent(parsedURL) {
      if (parsedURL.protocol == 'http:') {
        return httpAgent
      } else {
        return httpsAgent
      }
    }
  }

  return nodeFetch(nodeInput, nodeInit) as unknown as Promise<Response>
}
