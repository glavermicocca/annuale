import { GridRequest, TubularHttpClientAbstract, TubularHttpClient, GridResponse } from 'tubular-common'
import { loadIdToken } from './apiUtils'

export default class CustomHttpClient implements TubularHttpClientAbstract {
  public request: string | Request

  public constructor(request: string | Request | TubularHttpClientAbstract) {
    const r = TubularHttpClient.resolveRequest(request)
    this.request = r
  }

  public async fetch(gridRequest: GridRequest): Promise<GridResponse> {
    const idToken = loadIdToken()
    const req = TubularHttpClient.getRequest(this.request, gridRequest)
    req.headers.append('Authorization', `Bearer ${idToken}`)
    const response = await fetch(req)
    const data = await response.json()
    TubularHttpClient.fixResponse(data)
    return data
  }
}
