<template>
  <Modal title-modal="Ajouter une nouvelle mise à jour">
    <div class="modal-container">
      <div class="modal-input margin-top-16">
        <label for="category-name">Nom de la maj: </label>
        <input
          v-model="update.name"
          placeholder="Ma super maj"
          type="text"
          name="category-name"
        />
      </div>
      <div class="modal-input margin-top-16">
        <label for="category-name">version de la maj: </label>
        <input
          v-model="update.version"
          placeholder="v1.0.0"
          type="text"
          name="category-name"
        />
      </div>
      <div class="modal-input margin-top-16">
        <label for="category-name">date de fin: </label>
        <vue-datepicker-local
          v-model="update.date"
          :local="local"
          class="datepicker"
        ></vue-datepicker-local>
      </div>
      <div style="width:100%;display:flex;justify-content:center">
        <button
          class="button-add-task green margin-height-16"
          @click="SendUpdate"
        >
          Valider
        </button>
        <button class="red" @click="exitModal()">quitter</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "@/components/Base/BaseModal.vue";

export default {
  components: {
    Modal
  },
  data() {
    return {
      update: {
        name: "",
        version: "",
        date: new Date()
      },
      local: {
        dow: 1, // Monday is the first day of the week
        hourTip: "Select Hour", // tip of select hour
        minuteTip: "Select Minute", // tip of select minute
        secondTip: "Select Second", // tip of select second
        yearSuffix: "", // format of head
        monthsHead: "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), // months of head
        months: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), // months of panel
        weeks: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), // weeks
        cancelTip: "Cancel", // default text for cancel button
        submitTip: "Submit" // default text for submit button
      }
    };
  },
  methods: {
    ...mapActions(["addUpdate"]),
    exitModal() {
      this.$emit("closeModal");
    },
    async SendUpdate() {
      const regexVersion = /\b[v][\d]\b\.\b[\d]\b\.\b[\d]\b/;
      if (
        this.update.name !== "" &&
        this.update.version !== "" &&
        regexVersion.test(this.update.version)
      ) {
        this.addUpdate(this.update);
      }
    }
  }
};
</script>

<style scoped>
.modal-container {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}

.modal-input {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}

h4 {
  width: 100%;
  text-align: center;
}

.datepicker {
  border: 1px black solid;
}
</style>
