<template lang="pug">
  section.section
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
  async asyncData({ redirect, store }) {
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
    ...mapGetters(['user', 'isLogin']),
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    async publish() {
      const payload = {
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName,
        },
        ...this.formData
      }
      await this.publishPost({ payload })
      this.$router.push('/posts')
    },
    ...mapActions('posts', ['publishPost']),
    ...mapActions(['autoLogin'])
  }
}
</script>
