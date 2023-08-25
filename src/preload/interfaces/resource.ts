export interface IResource {
  id: number
  name: string
  price: number
  amount?: number
}

export interface ICreateResourceArgs {
  name: string
  price: number
  amount?: number
}

export interface IUpdateResourceArgs {
  id: number
  newName: string
  newPrice: number
  newAmount?: number
}

export interface IDeleteResourceArgs {
  id: number
}

export interface IResourceResponse {
  success: boolean
  resource?: IResource
  error?: string
}

export interface IResourcesResponse {
  success: boolean
  resources?: IResource[]
  error?: string
}
