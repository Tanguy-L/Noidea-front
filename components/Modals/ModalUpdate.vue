<template>
  <Modal title-modal="Ajouter une nouvelle mise à jour">
    <div v-if="errors.length" class="modal-container">
      <p>Pensez à corriger les erreurs suivantes :</p>
      <ul>
        <li v-for="error in errors" :key="error.index">{{ error }}</li>
      </ul>
    </div>
    <section class="modal-container" @:keyup.enter="SendUpdate">
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
          placeholder="1.0.0"
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
        <button class="green margin-height-16" @click="SendUpdate">
          Valider
        </button>
        <button class="red" @click="exitModal()">quitter</button>
      </div>
    </section>
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
        name: null,
        version: null,
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
      },
      errors: []
    };
  },
  methods: {
    ...mapActions(["addUpdate"]),
    exitModal() {
      this.$emit("closeModal");
    },
    async SendUpdate() {
      this.errors = [];
      const regexVersion = /\b[\d]\b\.\b[\d]\b\.\b[\d]\b/;
      const updateLocal = { ...this.update };
      updateLocal.version = "v" + this.update.version;

      if (!this.update.name) {
        this.errors.push("Le nom de la mise à jour est requis");
      }

      if (!this.update.version) {
        this.errors.push("La version de la mise à jour est requis");
      }

      if (this.update.version && !regexVersion.test(this.update.version)) {
        this.errors.push(
          "La version doit être composé de 3 chiffres séparés par des points comme => 1.0.0"
        );
      }

      if (!this.errors.length) {
        this.addUpdate(updateLocal);
        this.$emit("closeModal");
      }
    }
  }
};
</script>

<style scoped>
.button-add-task {
  border: none;
  color: white;
  font-size: 12px;
  line-height: 24px;
  padding: 0 25px;
}

.button-add-task:hover {
  cursor: pointer;
}

.modal-container {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  z-index: 6;
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

@media screen and (max-width: 1400px) {
  .modal-input {
    flex-wrap: wrap;
  }

  label {
    width: 100%;
  }

  .datepicker > input {
    border: 1px solid black !important;
  }
}
</style>
