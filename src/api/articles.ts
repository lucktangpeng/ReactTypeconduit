import request from '../utils/request'

export interface ArticlesParams {
  author?: string
  limit?: number
  offset?: number
  favorited?: string
}

export const getArticles = (params: ArticlesParams = {}) => {
  return request({
    method: 'get',
    url: '/articles',
    params
  })
}

export const getArticlesInfo = (slug: string) => {
  return request({
    method: 'get',
    url: `/articles/${slug}`
  })
}



export const getArticlesFeed = () => {
  return request({
    method: 'get',
    url: '/articles/feed'
  })
}