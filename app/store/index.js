export const strict = false

import firebase from '../plugins/firebase.js'
import moment from '../plugins/moment.js'


export const state = () => ({
  user: null,
  isLogin: false
})

export const getters = {
  user: state => (state.user ? Object.assign({ likes: [] }, state.user) : null),
  isLogin: state => state.isLogin,
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    !!state.user ? state.isLogin = true : state.isLogin = false
  },
  updateUser(state, { user }) {
    state.user = user
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
  async logout ({ commit }) {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    });
  },
  async autoLogin({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
      } else {
        commit('setUser', null)
      }
    })
  },
  async addLikeLogToUser({ commit }, { uid, post }) {

    const user = await this.$axios.$get(`/users/${uid}.json`)
    if (!user.likes) {
      user.likes = []
    }
    user.likes.push({
      created_at: moment().format(),
      user_uid: uid,
      post_id: post.id
    })
    const newUser = await this.$axios.$put(`/users/${uid}.json`, user)
    newUser.uid = uid
    commit('updateUser', { user: newUser})
  },
  async removeLikeLogToUser({ commit }, { uid, post }) {
    const user = await this.$axios.$get(`/users/${uid}.json`)
    user.likes = user.likes.filter(like => like.post_id !== post.id) || []
    const newUser = await this.$axios.$put(`/users/${uid}.json`, user)
    newUser.uid = uid
    commit('updateUser', { user: newUser })
  }
}
