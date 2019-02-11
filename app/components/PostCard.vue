<template lang="pug">
.card(@click="handleClick(post)")
  .card-content
    p.title
      | {{ post.title }}
    p.subtitle
      | {{ user.displayName }}
    p.is-6
      | {{ post.created_at}}
</template>

<script>
export default {
  props: ['post', 'user'],
  methods: {
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`)
    }
  }
}


</script>
