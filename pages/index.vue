<template>
  <div class="main-page" style="flex-wrap:wrap;">
    <Update v-for="(el, index) in updates" :key="index" :id-update="el._id" />
    <CreateUpdate />
  </div>
</template>

<script>
import Update from "@/components/Columns/Update.vue";
import CreateUpdate from "@/components/Columns/CreateUpdate.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Update,
    CreateUpdate
  },
  data() {
    return {
      test: ""
    };
  },
  computed: {
    ...mapGetters(["categories", "updates"])
  },
  async fetch({ store }) {
    await store.dispatch("fetchData");
    await store.dispatch("fetchCategories");
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
