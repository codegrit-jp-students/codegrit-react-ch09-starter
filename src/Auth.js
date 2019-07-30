import { Component } from 'react'

class Auth extends Component {
  state = {
    me: JSON.parse(localStorage.getItem('me')),
    isLoggedIn: localStorage.getItem('isLoggedIn')
  }
  
  login = (params)  => {
    /* 
      アップデートして、メールアドレスがtest@test.com、
      パスワードがpasswordの時のみログインに成功するように
      してください。
    */
    const me = {
      email: params.email,
      authToken: 'test',
      name: "テストユーザー",
      username: "testuser",
    }
    return new Promise((resolve, reject) => {
      if (params.email === "test@test.com" && params.password === "password") {
        localStorage.setItem('me', JSON.stringify(me))
        localStorage.setItem('isLoggedIn', true)
        this.setState({ 
          me,
          isLoggedIn: true 
        })
        resolve({
          success: true,
          message: 'ログインに成功しました。'
        })
      } else {
        this.setState({ isLoggedIn: false })
        reject({
          success: false,
          message: 'メールアドレスもしくはパスワードが違います'
        })
      }
    })

  }
  logout = (e = null) => {
    if (e) e.preventDefault()
    localStorage.removeItem('me')
    localStorage.removeItem('isLoggedIn')

    this.setState({
      me: null, 
      isLoggedIn: false
    })
  }
  getMe = () => {
    return localStorage.getItem('me')
  }
  render() {
    // childrenに対してファンクションとstateを渡す。
    const handleProps = {
      login: this.login,
      logout: this.logout,
      ...this.state
    }
    //console.log(this.state.isLoggedIn)
    return this.props.children(handleProps)
  }
}

export default Auth;