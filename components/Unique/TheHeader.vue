<template>
  <header class="flex-center">
    <div class="left">
      <img src="~/assets/images/logo-noidea.png" />
    </div>
    <div class="right">
      <nuxt-link to="/" class="text-link">Accueil</nuxt-link>
      <nuxt-link to="/dashboard" class="text-link">Tableau de bord</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.text-link {
  text-decoration: none;
  color: black;
  font-family: "Montserrat";
  margin: 0 8px;
}

.text-link:focus {
  outline: 0;
}

.link:hover:before {
  width: 100%;
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
