<template>
  <div id="main-layout">
    <HeaderApp />
    <nuxt />
  </div>
</template>

<script>
import HeaderApp from "@/components/HeaderApp.vue";
export default {
  components: {
    HeaderApp
  }
};
</script>

<style scoped>
#main-layout {
  height: 100%;
  width: 100%;
}
</style>
