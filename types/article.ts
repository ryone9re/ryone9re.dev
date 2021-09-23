export type Article = {
  id: number
  createdAt: string
  updateAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
}

export type CmsResponse = {
  contents: Article[]
  totalCount: number
  offset: number
  limit: number
}

export type PaginationReq = {
  totalCount: number
  urlPath: string | string[]
}
