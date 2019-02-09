<template lang="pug">
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user', 'isLogin'])
  },
  async mounted() {
    this.autoLogin()
  },
  methods: {
    ...mapActions(['autoLogin'])
  }
}
</script>
