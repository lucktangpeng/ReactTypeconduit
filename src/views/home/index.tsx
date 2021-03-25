import React, { useEffect, useState } from 'react'
import { getArticles, getArticlesFeed } from '../../api/articles'
import { Link } from 'react-router-dom'
import Moment from 'moment'
// const loadGetArticles = async () => {
//   const { data } = await getArticles()
//   console.log(data)
// }

interface Author {
  bio: string
  following: boolean
  image: string
  username: string
}

export interface Articles {
  author: Author
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  tagList: Array<string>
  slug: string
  title: string
  updatedAt: string
}

const Home = () => {
  const [articlesList, setArticlesList] = useState<Articles[]>([])
  const [status, setStatus] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    status ? loadGetArticles(): loadGetArticlesFeed()
  },[status])

  const loadGetArticles = async () => {
    const { data } = await getArticles()
    setArticlesList(data.articles)
    setLoading(false)
  }

  const loadGetArticlesFeed = async () => {
    const { data } = await getArticlesFeed()
    setArticlesList(data.articles)
    setLoading(false)
  }
  const changeTag = (status: boolean) => {
    setStatus(status)
  }
  return (
  <div className="home-page">

  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div className="container page">
    <div className="row">

      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <span  className={`nav-link ${!status ? 'active': ''}`} onClick={() => {changeTag(false)}}>Your Feed</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${status ? 'active': ''}`} onClick={() => {changeTag(true)}}>Global Feed</span>
            </li>
          </ul>
        </div>

        {
          articlesList.map(item => {
            return (
              <div className="article-preview" key={item.slug}>
                <div className="article-meta">
                  <Link to={`/userInfo/${item.author.username}`}><img src={item.author.image} alt="123" /></Link>
                  <div className="info">
                    <Link to={`/userInfo/${item.author.username}`} className="author">{item.author.username}</Link>
                    <span className="date">{Moment(item.createdAt).format('MMMM DD,YYYY')}</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {item.favoritesCount}
                  </button>
                </div>
                <Link to={`/article/${item.slug}`} className="preview-link">
                  <h1>{item.slug}</h1>
                  <p>{item.body}</p>
                  <span>Read more...</span>
                </Link>
              </div>
            )
          })
        }
        {
          loading ? (
            <div className="article-preview">
            Loading articles...</div>
          ) : ''
        }
        {/* {
          articlesList.length ? '' : <div className="article-preview">
          No articles are here... yet.</div>
        } */}

      </div>

      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>

          <div className="tag-list">
            <a href="/" className="tag-pill tag-default">programming</a>
            <a href="/" className="tag-pill tag-default">javascript</a>
            <a href="/" className="tag-pill tag-default">emberjs</a>
            <a href="/" className="tag-pill tag-default">angularjs</a>
            <a href="/" className="tag-pill tag-default">react</a>
            <a href="/" className="tag-pill tag-default">mean</a>
            <a href="/" className="tag-pill tag-default">node</a>
            <a href="/" className="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
  )
}

export default Home
