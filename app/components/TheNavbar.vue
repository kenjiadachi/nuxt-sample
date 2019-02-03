<template lang="pug">
  nav.navbar.header.has-shadow.is-primary(role="navigation" aria-label="main navigation")
    .navbar-brand
      nuxt-link.navbar-item(to="/")
        img(
          src="~assets/buefy.png"
          alt="Buefy"
          height="28"
        )
        a.navbar-burger.burger(role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
    #navbarBasicExample.navbar-menu
      .navbar-end
        .navbar-item
          .buttons
            nuxt-link.button.is-primary.is-inverted(to="/")
              strong Sign up
            nuxt-link.button.is-primary(to="/")
              | Sign in
</template>
