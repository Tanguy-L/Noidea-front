<template>
  <header class="flex-center">
    <div class="left">
      <img src="~/assets/images/logo-noidea.png" />
    </div>
    <div class="right">
      <nuxt-link class="link blue" to="/">Accueil</nuxt-link>
      <nuxt-link class="link blue" to="/dashboard">Tableau de bord</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.link {
  height: 24px;
  padding: 0 16px;
  color: white;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  line-height: 24px;
  margin: 0 8px;
}

.flex-center {
  justify-content: space-between;
}

.left {
  margin-left: 16px;
}

.right {
  margin-right: 16px;
}
</style>
