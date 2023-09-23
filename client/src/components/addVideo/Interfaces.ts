export interface YTResponse {
  etag: string,
  items: {}[],
  kind: "youtube#videoListResponse",
  pageInfo: {
    resultsPerPage: 1,
    totalResults: 1
  }
}