import React,{ useState, FormEvent, FC } from 'react'
import { Link } from 'react-router-dom'
import {  regist } from '../../api/login'
import { useDispatch } from 'react-redux'
import { loginActionAsync } from '../../store/actions/user.action'
interface Props {
  status?: boolean
}

const Login: FC<Props> = ({status}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})


  const dispatch = useDispatch()
  const nameChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }
  const emailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }
  const passwordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }
  const registCommit = async (event: FormEvent) => {
    event.preventDefault()
    const { data } = await regist({user: {
      username: name,
      email: email,
      password: password
    }})
    console.log(data)
  }
  const loginCommit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(loginActionAsync({user: {
        email: email,
        password: password
      }}))
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{ !status ? 'Sign up': 'Sign in'}</h1>
            <p className="text-xs-center">
              {
                !status ? (
                  <Link to='/regist'>Have an account?</Link>
                ) : (
                  <Link to='/login'>Need an account?</Link>
                )
              }
            </p>

            <ul className="error-messages">
              {
                errors ? (
                  Object.keys(errors).map(item => {
                    return (<li>{item}: {errors[item]}</li>)
                  })
                ) : ''
              }
            </ul>

            <form>
              {
                !status ? (
                  <fieldset className="form-group">
                    <input 
                      value={name}
                      onChange={nameChange}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                    />
                  </fieldset>
                ) : ''
              }
              <fieldset className="form-group">
                <input 
                  value={email}
                  onChange={emailChange}
                  className="form-control form-control-lg" 
                  type="text" 
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input 
                  value={password}
                  onChange={passwordChange}
                  className="form-control form-control-lg" 
                  type="password" 
                  placeholder="Password"
                />
              </fieldset>
              <button onClick={(!status ? registCommit : loginCommit)} className="btn btn-lg btn-primary pull-xs-right">
                { !status ? 'Sign up': 'Sign in' }
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login

