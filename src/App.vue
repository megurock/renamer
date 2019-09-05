<template lang="pug">
  #app
    #nav
      router-link(to="/") Home
      router-link(to="/about") About
    router-view
</template>

<style scoped lang="scss">
#app {
  display: grid;
  min-height: 100vh;
  grid-template-rows: 32px 1fr;
  grid-template-areas: 
    "nav"
    "app"
}

#nav {
  grid-area: nav;
  text-align: center;
  a {
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
