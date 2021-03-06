import { getToken, setToken, removeToken } from '@/common/auth'
import userapi from '@/api/user'
import md5 from 'js-md5'

const SET_TOKEN = 'SET_TOKEN'
const SET_NO = 'SET_NO'
const SET_NAME = 'SET_NAME'
const SET_TEL = 'SET_TEL'
const SET_PERMISSIONS = 'SET_PERMISSIONS'

const user = {
  state: {
    token: getToken(),
    userno: '',
    username: '',
    userTel: '',
    permissions: ''
  },
  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token
    },
    [SET_NO] (state, userno) {
      state.userno = userno
    },
    [SET_TEL] (state, userTel) {
      state.userTel = userTel
    },
    [SET_NAME] (state, username) {
      state.username = username
    },
    [SET_PERMISSIONS] (state, permissions) {
      state.permissions = permissions
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        const { userNo, passWord } = user
        userapi
          .login({ userNo: userNo.trim(), passWord: md5(passWord) })
          .then(res => {
            if (res.result) {
              setToken(res.token)
              commit(SET_TOKEN, res.token)
              commit(SET_PERMISSIONS, '')
            }
            return resolve(res)
          })
          .catch(err => {
            return reject(err)
          })
      })
    },
    pullUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userapi
          .userInfo()
          .then(resp => {
            let data = resp
            commit(SET_NAME, data.userName)
            commit(SET_PERMISSIONS, data.permissions)
            commit(SET_NO, data.userNo)
            commit(SET_TEL, data.userTel)
            return resolve(data)
          })
          .catch(err => {
            return reject(err)
          })
      })
    },
    logout ({ commit }) {
      userapi.logout().then(() => {
        removeToken()
        commit(SET_TOKEN, '')
        commit(SET_PERMISSIONS, '')
      })
    },
    changePwd ({ commit }, pwdInfo) {
      return new Promise((resolve, reject) => {
        userapi
          .changePwd(pwdInfo)
          .then(resp => {
            let data = resp.data
            if (data) {
              removeToken()
              commit(SET_TOKEN, '')
            }
            return resolve(data)
          })
          .catch(err => {
            return reject(err)
          })
      })
    }
  },
  getters: {
    token: state => state.token,
    username: state => state.username,
    permissions: state => state.permissions,
    userno: state => state.userno,
    usertel: state => state.userTel
  }
}
export default user
