<template>
  <div class="main-page" style="flex-wrap:wrap;">
    <Update
      v-for="(el, index) in updates"
      :key="index"
      :categories="categories"
      :update="el"
    />
    <createUpdate />
  </div>
</template>

<script>
import Update from "@/components/Update.vue";
import createUpdate from "@/components/CreateUpdate.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Update,
    createUpdate
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["categories", "updates"])
  },
  async fetch({ store }) {
    await store.dispatch("fetchData");
    await store.dispatch("getCategories");
  }
};
</script>

<style scoped>
.main-page {
  background-color: #d6d6d6;
  padding-top: 24px;
  height: calc(100% - 96px);
  display: flex;
}
</style>
