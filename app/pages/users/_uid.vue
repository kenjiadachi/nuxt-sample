<template lang="pug">
section.section
  .columns
    .column.is-one-third
      .card
        .card-image
          figure.image.is-square
            img(:src="user.photoURL")
        .card-content.has-text-centered
          p.title.is-4
            | {{ user.displayName }}
    .column
      .columns.is-multiline
        .column.is-half(v-for="post of userPosts" :key="post.id")
          post-card(
            v-bind:post = "post"
            v-bind:user = "user"
          )
</template>


<script>
import moment from '~/plugins/moment'
import PostCard from '~/components/PostCard.vue'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store, route, error }) {
    const { uid } = route.params

    await store.dispatch('users/fetchUser', { uid })

  },
  computed: {
    userPosts() {
      return Object.entries(this.user.posts).map(([id, post]) => {
        post.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
        return { id, ...post }
      })
    },
    user() {
      const user = this.users.find(u => u.uid === this.$route.params.uid)
      if(!user) return null
      return Object.assign({ posts: [] }, user )
    },
    ...mapGetters('users', ['users'])
  },
  components: {
    PostCard
  }
}
</script>
