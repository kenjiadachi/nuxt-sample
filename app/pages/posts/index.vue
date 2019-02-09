<template lang="pug">
section.section
  .columns.is-multiline
    .column.is-one-third(v-for="post of posts" :key="posts.id")
      .card(@click="handleClick")
        .card-content
          p.title
            | {{ post.title }}
          p.subtitle
            | {{ post.user.displayName }}
          p.is-6
            | {{ post.created_at}}
</template>

<script>
import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  async asyncData({ redirect, store }) {
    if (!store.getters['isLogin']) {
      redirect('/')
    }
    await store.dispatch('posts/fetchPosts')
  },
  computed: {
    ...mapGetters(['user', 'isLogin']),
    ...mapGetters('posts', ['posts']),
    showPosts() {
      return this.posts.map(post => {
        post.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
        return post
      })
    }
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    ...mapActions(['autoLogin']),
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`)
    }
  }
}
</script>
