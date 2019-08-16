<template>
  <div>
    <button class="text-big-button" @click="showModal = !showModal">
      Ajouter une mise à jour
    </button>
    <ModalUpdate v-if="showModal" @closeModal="showModal = false" />
  </div>
</template>

<script>
import ModalUpdate from "@/components/Modals/ModalUpdate.vue";

export default {
  components: {
    ModalUpdate
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
button {
  display: block;
  width: 200px;
  height: 100%;
  padding: 0;
  margin: 0;
  height: 800px;
  margin-left: 16px;
  transition: all 0.3s;
  width: 250px;
  border: 1px white solid;
  background-color: rgba(36, 46, 62, 0);
}

button:hover {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.205),
    0px 0px 16px inset rgba(0, 0, 0, 0.205);
}
</style>
