<template>
  <header class="flex-center">
    <div class="left">
      <img src="~/assets/images/logo-noidea.png" />
    </div>
    <div class="right">
      <BaseLink text="Accueil" link="/" />
      <BaseLink text="Tableau de bord" link="/dashboard" />
    </div>
  </header>
</template>

<script>
import BaseLink from "@/components/Base/BaseLink.vue";

export default {
  components: {
    BaseLink
  }
};
</script>

<style scoped>
.flex-center {
  justify-content: space-between;
}

.left {
  margin-left: 16px;
}

.right {
  margin-right: 16px;
  display: flex;
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
