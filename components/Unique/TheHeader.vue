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
  padding: 4px 16px;
  color: white;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  line-height: 24px;
  margin: 0 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.11);
  transition: 0.3s;
}

.link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
  background-color: rgb(22, 47, 70);
  border-bottom: white solid 1px;
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

@media screen and (max-width: 340px) {
  .flex-center {
    justify-content: center;
  }

  header {
    height: 96px;
  }
}
</style>
