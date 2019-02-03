<template lang="pug">
  nav.navbar.header.has-shadow.is-primary(role="navigation" aria-label="main navigation")
    .navbar-brand
      nuxt-link.navbar-item(to="/")
        img(
          src="~assets/buefy.png"
          alt="Buefy"
          height="28"
        )
      .navbar-burger
        span
        span
        span
</template>
