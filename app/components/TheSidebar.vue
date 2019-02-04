<template lang="pug">
  aside.column.is-2.section
    p.menu-label.is-hidden-touch
      | General
    ul.menu-list
      li(v-for="(item, key) of items" :key="key")
        nuxt-link(:to="item.to" exact-active-class="is-active")
          b-icon(:icon="item.icon")
          | {{ item.title }}

</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'New Post',
          icon: 'pencil',
          to: { name: 'posts-new' }
        },
        {
          title: 'All Posts',
          icon: 'folder',
          to: { name: 'posts' }
        }
      ]
    }
  }
}
</script>
