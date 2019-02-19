<template lang="pug">
  nav.navbar.header.has-shadow.is-primary(role="navigation" aria-label="main navigation")
    .navbar-brand
      nuxt-link.navbar-item(to="/")
        img(src="~assets/buefy.png" alt="Buefy" height="28")
      a.navbar-burger.burger(role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample")
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
    #navbarBasicExample.navbar-menu
      .navbar-end
        .navbar-item
          .buttons
            no-ssr
              button.button.is-primary.is-inverted(@click="logout" v-if="this.isLogin")
                strong ログアウト
              button.button.is-primary.is-inverted(@click="googleLogin" v-else)
                strong ログイン
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user', 'isLogin'])
  },
  methods: {
    ...mapActions(['googleLogin', 'logout'])
  }
}
</script>
