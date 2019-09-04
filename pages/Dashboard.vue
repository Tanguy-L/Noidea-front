<template>
  <div class="main-page">
    <Update
      v-for="(el, index) in updates"
      :key="index"
      style="margin-top:24px;"
      :id-update="el._id"
    />
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
  padding: 24px 0px;
  min-height: calc(100% - 80px);
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 640px) {
  .main-page {
    flex-wrap: nowrap;
    overflow-y: auto;
  }
}
</style>
