export const strict = false
import firebase from '../plugins/firebase.js'


export const state = () => ({
  user: null,
  isLogin: false
})

export const getters = {
  user: state => state.user,
  isLogin: state => state.isLogin
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setIsLogin (state, payload) {
    state.isLogin = payload
  }
}

export const actions = {
  async googleLogin ({ commit }) {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(function(result) {
        // 成功時の処理
      }).catch(function(error) {
        // エラー処理
      });
  },
  async logout ({ commit }) {
    firebase.auth().signOut()
      .then(function() {
        // 成功時の処理
      }).catch(function(error) {
        // エラー処理
      });
  },
  async autoLogin({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
        commit('setIsLogin', true)
      } else {
        commit('setUser', null)
        commit('setIsLogin', false)
      }
    })
  }
}
