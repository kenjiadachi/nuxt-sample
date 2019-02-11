export const state = () => ({
  users: []
})

export const getters = {
  users: (state) => state.users
}

export const mutations = {
  addUser(state, { user }) {
    state.users.push(user)
  },
  addUserPost(state, { user, post }) {
    state.userPosts[user.uid].push(post)
  },
  clearUserPosts(state, { user }) {
    state.userPosts[user.uid] = []
  }
}

export const actions = {
  async fetchUser({ commit }, { uid }) {
    const user = await this.$axios.$get(`/users/${uid}.json`)
    commit('addUser', {
      user: {
        uid,
        ...user
      }
    })
  }
}
