<template lang="pug">
section.section
  .columns.is-multiline
    .column.is-one-third(v-for="post of posts" :key="post.id")
      post-card(
        v-bind:post = "post"
        v-bind:user = "post.user"
      )
</template>

<script>
import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'
import PostCard from '~/components/PostCard.vue'
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
    },
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    ...mapActions(['autoLogin'])
  },
  components: {
    PostCard
  }
}
</script>
