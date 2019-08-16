<template>
  <div id="main-layout">
    <TheHeader />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Unique/TheHeader.vue";
export default {
  components: {
    TheHeader
  }
};
</script>

<style scoped>
#main-layout {
  height: 100%;
  width: 100%;
}
</style>
