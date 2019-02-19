<template lang="pug">
  section.section
    .columns.is-mobile
      card(title="Free" icon="github-circle")
        | Open source on
        a(href="https://github.com/buefy/buefy")  GitHub
      card(title="Responsive" icon="cellphone-link")
        b.has-text-grey Every
        |  component is responsive
      card(title="Modern" icon="alert-decagram")
        | Built with
        a(href="https://vuejs.org/") Vue.js
        |  and
        a(href="http://bulma.io/") Bulma
      card(title="Lightweight" icon="arrange-bring-to-front")
        | No other internal dependency
</template>

<script>
import Card from '~/components/Card'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['user', 'isLogin']),
  },
  async mounted() {
    this.autoLogin()
  },
  components: {
    Card
  },
  methods: {
    ...mapActions(['autoLogin'])
  }
}
</script>
