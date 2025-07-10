export interface NewsItem {
  uuid: string
  title: string
  description: string
  image_url: string
  url: string
  published_at: string
  source: string
}
export interface NewsResponse {
  data: NewsItem[]
  meta: {
    found: number
    returned: number
    limit: number
    page: number
  }
}
