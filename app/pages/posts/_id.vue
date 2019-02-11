<template lang="pug">
section.section
  p.title {{ post.title }}
  p.subtitle(@click="handleClick(post.user)") {{ post.user.displayName }}
  p {{ post.body }}
</template>

<script>

import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'
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
    post() {
      return this.posts.find(p => p.id === this.$route.params.id)
    },
    ...mapGetters('posts', ['posts']),
    ...mapGetters(['user', 'isLogin'])
  },
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    ...mapActions(['autoLogin']),
    handleClick(user) {
      this.$router.push(`/users/${user.uid}`)
    }
  }
}

</script>
