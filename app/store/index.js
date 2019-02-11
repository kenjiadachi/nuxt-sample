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
  async googleLogin () {
    const users = await this.$axios.$get(`/users.json`)
    const userUids = !!users ? Object.keys(users) : []
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
      if (userUids.indexOf(result.user.uid) >= 0) {
        firebase.database().ref('users/' + result.user.uid).update({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
      } else {
        firebase.database().ref('users/' + result.user.uid).set({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
      }
    }).catch(function(error) {
      console.log(error)
    });
  },
  async logout () {
    firebase.auth().signOut().then(function() {
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
