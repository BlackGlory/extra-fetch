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
  const nodeInit: NodeRequestInit = init as NodeRequestInit | undefined ?? {}
  if (init?.keepalive) {
    nodeInit.agent = parsedURL => parsedURL.protocol == 'http:'
                                  ? httpAgent
                                  : httpsAgent
  }

  return nodeFetch(nodeInput, nodeInit) as unknown as Promise<Response>
}
