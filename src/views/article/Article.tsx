import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getArticlesInfo } from '../../api/articles'
import { Articles } from '../home'
import ReactMarkdown from 'react-markdown'
const ArticlesInitial = {
  author: {
    bio: '',
    following: false,
    image: '',
    username: '',
  },
  body: '',
  createdAt: '',
  description: '',
  favorited: false,
  favoritesCount: 0,
  tagList: [],
  slug: '',
  title: '',
  updatedAt: ''
}

const Article = () => {

  const [articleInfo, setArticleInfo] = useState<Articles>(ArticlesInitial)
  const loadGetArticles = async (slug: string) => {
    const { data: {article} } = await getArticlesInfo(slug)
    console.log(article, 'article')
    setArticleInfo(article)
  }


  const { slug } = useParams<{slug: string}>()
  useEffect( () => {
    loadGetArticles(slug)
  }, [])
  console.log(articleInfo)
  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{articleInfo.title}</h1>

          <div className="article-meta">
            <Link to={`/userIngo/${articleInfo.author.username}`}><img src={articleInfo.author.image} alt='1' /></Link>
            <div className="info">
              <Link to={`/userIngo/`} className="author">{articleInfo.author.username}</Link>
              <span className="date">{articleInfo.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              {
                articleInfo.author.following ? `UnFollow ${articleInfo.author.username}` : `Follow ${articleInfo.author.username}`
              }
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              Favorite Post <span className="counter">({articleInfo.favoritesCount})</span>
            </button>
          </div>

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">
            <p>
            {articleInfo.description}
            </p>
            <h2 id="introducing-ionic">{articleInfo.title}</h2>
            <p>
              <ReactMarkdown source={articleInfo.body}/></p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div className="info">
              <a href="" className="author">Eric Simons</a>
              <span className="date">January 20th</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons <span className="counter">(10)</span>
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <div className="row">

          <div className="col-xs-12 col-md-8 offset-md-2">

            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">
                Post Comment
                </button>
              </div>
            </form>
            
            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default Article
