<template lang="pug">
  section
    b-field(label="Title")
      b-input(v-model="formData.title")
    b-field(label="Body")
        b-input(v-model="formData.body" type="textarea")
    button.button.is-primary(@click="publish")
      b-icon(icon="upload")
      span
        | Publish
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  asyncData({ redirect, store }) {
    if (!store.getters['isLogin']) {
      redirect('/')
    }
    return {
      formData: {
        title: '',
        body: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'isLogin'])
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    async publish() {
      const payload = {
        user: this.user,
        ...this.formData
      }
      await this.publishPost({ payload })
      this.$router.push('/posts')
    },
    ...mapActions('users', ['updateUser']),
    ...mapActions('posts', ['publishPost']),
    ...mapActions(['autoLogin'])
  }
}
</script>
