import React, { useEffect, useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { getProfile } from '../../api/user'
import { getArticles } from '../../api/articles'
import { AppState } from '../../store/reducers'
import { loginState } from '../../store/reducers/user.reducer'
import { Articles } from '../home'
import { Link, useParams } from 'react-router-dom'

interface ProFileState {
  bio: string
  following: boolean
  image: string
  username: string
}

const proFileInital = {
  bio: '',
  following: false,
  image: '',
  username: '',
}

interface Props {
  item: Articles
}

const ProfileItem: FC<Props> = ({item}) => (
  <div className="article-preview">
    <div className="article-meta">
      <Link to={`/userInfo/${item.author.username}`}><img src={item.author.image} alt="1" /></Link>
      <div className="info">
        <Link to={`/userInfo/${item.author.username}`} className="author">{item.author.username}</Link>
        <span className="date">{item.createdAt}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {item.favoritesCount}
      </button>
    </div>
  </div>
)


const User = () => {
  // user 头像部分
  const {user} = useParams<{user: string}>()
  const [proFile, setProFile] = useState<ProFileState>(proFileInital)
  const login = useSelector<AppState, loginState>(state => state.login)
 
  const loadGetProfile = async (params: string) => {
    const {data: { profile}} = await getProfile(params)
    const {data: { articles}} = await getArticles({author: user})
    setProFile(profile)
    setArticlesList(articles)
  }
  useEffect( () => {
    loadGetProfile(user)
  }, [])
  // 下面文章请求部分
  const [articlesList, setArticlesList] = useState<Articles[]>([])
  const [articlesGlobalList, setArticlesGlobalList] = useState<Articles[]>([])
  const [globalStatus, setGlobalStatus] = useState<boolean>(true)

  // 切换列表
  const loadGetArticlesFavorited = async () => {
    const {data: { articles}} = await getArticles({favorited: user})
    setArticlesGlobalList(articles)
  }
  useEffect( () => {
    if (globalStatus) {
      loadGetProfile(user)
    } else {
      loadGetArticlesFavorited()
    }
  },[globalStatus])
  const changeList = (status: boolean) => {
    setGlobalStatus(status)
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={proFile.image} className="user-img" alt="1" />
              <h4>{proFile.username}</h4>
              <p>
                {proFile.bio}
              </p>
              {
                login.userInfo.username === user ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp;
                    Edit Profile Settings
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp;
                    {
                      proFile.following ? " UnFollow drinkjuice" : "Follow drinkjuice"
                    }
                  </button>
                )
              }
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <span className={`nav-link ${globalStatus ? 'active': ''}`} style={{cursor: 'pointer'}} onClick={() => {changeList(true)}}>My Articles</span>
                </li>
                <li className="nav-item">
                  <span className={`nav-link ${!globalStatus ? 'active': ''}`} style={{cursor: 'pointer'}} onClick={() => {changeList(false)}}>Favorited Articles</span>
                </li>
              </ul>
            </div>
            {
              globalStatus ? (
                articlesList.map( item => (
                    <ProfileItem item={item} key={item.slug}/>
                  )
                )
              ) : (
                articlesGlobalList.map( item => (
                  <ProfileItem item={item} key={item.slug}/>
                ))
              )
            }

            {/* {
              articlesList.map( item => (
                <div className="article-preview">
                  <div className="article-meta">
                    <Link to={`/userInfo/${item.author.username}`}><img src={item.author.image} alt="1" /></Link>
                    <div className="info">
                      <Link to={`/userInfo/${item.author.username}`} className="author">{item.author.username}</Link>
                      <span className="date">{item.createdAt}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i> {item.favoritesCount}
                    </button>
                  </div>
                </div>)
              )
            } */}
            {
              articlesList.length === 0 ? <div className="article-preview">No articles are here... yet.</div>: ''
            }
          </div>

        </div>
      </div>

    </div>
  )
}

export default User
