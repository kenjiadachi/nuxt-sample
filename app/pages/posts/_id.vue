<template lang="pug">
section.section
  p.title {{ post.title }}
  p.subtitle(@click="handleClick(post.user)") {{ post.user.displayName }}
  p {{ post.body }}
  no-ssr
    button.button.is-rounded(
      v-if="!isLiked"
      v-bind:disabled="!isLogin"
      @click="like"
    )
      b-icon(
        icon="heart"
        type="is-dark"
      )
      span like {{ post.likes.length }}
    button.button.is-rounded(
      v-else
      v-bind:disabled="!isLogin"
      @click="unlike"
    )
      b-icon(
        icon="heart"
        type="is-danger"
      )
      span like {{ post.likes.length }}
</template>

<script>

import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
export default {
  async asyncData({ redirect, store, route, error }) {
    if (!store.getters['isLogin']) {
      redirect('/')
    }
    const { id } = route.params
    if (store.getters['posts/posts'].find(p => p.id === id)) {
      return
    }
    try {
      await store.dispatch('posts/fetchPost', { id })
      if (!(store.getters['posts/posts'].find(p => p.id === this.$route.params.id))) {
        throw new Error('post not found')
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  computed: {
    ...mapGetters('posts', ['posts']),
    ...mapGetters(['user']),
    ...mapGetters(['isLogin']),
    post() {
      return this.posts.find(p => p.id === this.$route.params.id)
    },
    isLiked() {
      if (!this.user) return false
      return !!this.post.likes.find(l => l.user_uid === this.user.uid)
    },

  },
  async mounted() {
    this.autoLogin()
  },
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  methods: {
    ...mapActions(['autoLogin']),
    ...mapActions(['addLikeLogToUser', 'removeLikeLogToUser']),
    ...mapActions('posts', ['addLikeToPost', 'removeLikeToPost']),
    handleClick(user) {
      this.$router.push(`/users/${user.uid}`)
    },
    like() {
      if (!this.isLogin) {
        return
      }
      const likePayload = { uid: this.user.uid, post: this.post }

      this.addLikeToPost(cloneDeep(likePayload))
      this.addLikeLogToUser(cloneDeep(likePayload))
    },
    unlike() {
      if (!this.isLogin) {
        return
      }
      const likePayload = { uid: this.user.uid, post: this.post }
      this.removeLikeToPost(cloneDeep(likePayload))
      this.removeLikeLogToUser(cloneDeep(likePayload))
    }
  },
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}

</script>
