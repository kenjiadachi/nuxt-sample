<template lang="pug">
div
  the-navbar
  section.main-content.columns
    the-sidebar
    .container.column.is-10
      nuxt
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
export default {
  components: {
    TheNavbar,
    TheSidebar
  }
}
</script>
