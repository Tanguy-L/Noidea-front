<template>
  <Modal title-modal="Ajouter une nouvelle catégorie">
    <div
      v-if="errors.length"
      class="modal-container"
    >
      <p>Pensez à corriger les erreurs suivantes :</p>
      <ul>
        <li
          v-for="error in errors"
          :key="error.index"
        >{{ error }}</li>
      </ul>
    </div>
    <i
      class="material-icons close-icon"
      @click="exitModal()"
    >close</i>
    <div class="modal-container">
      <div class="modal-input margin-top-16">
        <label for="category-name">Nom de la catégorie: </label>
        <input
          v-model="payload.categoryName"
          type="text"
          name="category-name"
        />
      </div>
    </div>

    <div
      v-for="(el, index) in payload.tasks"
      :key="index"
      class="modal-container"
    >
      <p
        style="width:100%;text-align:center;"
        class="margin-top-16"
      >
        tâche {{ index + 1 }}
      </p>
      <div class="modal-input margin-top-16">
        <label for="name-task">Nom de la tâche: </label>
        <input
          v-model="el.name"
          type="text"
          name="name-task"
        />
      </div>
      <div class="modal-input margin-top-16">
        <label for="description-task">description : </label>
        <input
          v-model="el.description"
          type="textarea"
          name="description-task"
        />
      </div>
      <button
        class="red"
        @click="removeTask(index)"
      >Supprimer tâche</button>
    </div>

    <div class="row-buttons">
      <button
        class="green"
        @click="addCategoryRequest()"
      >Valider</button>
      <button
        class="blue"
        @click="addRowTask()"
      >Ajouter une tache</button>
      <button
        class="red"
        @click="exitModal()"
      >quitter</button>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "@/components/Base/BaseModal.vue";

export default {
  components: {
    Modal
  },
  props: {
    idUpdate: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data () {
    return {
      payload: {
        categoryName: "",
        tasks: []
      },
      errors: []
    };
  },
  computed: {
    ...mapGetters(["categoriesByName"])
  },
  methods: {
    ...mapActions(["addCategory", "addCategoryProject", "addTask"]),
    exitModal () {
      this.$emit("closeModal");
    },
    addRowTask () {
      let randomTask = {
        name: "test",
        description: "test",
        done: false,
        update: this.idUpdate
      };
      this.payload.tasks.push(randomTask);
    },
    removeTask (index) {
      return this.payload.tasks.splice(index);
    },
    addCategoryRequest () {
      const payload = {
        id: {
          update: this.idUpdate
        },
        body: {
          name: this.payload.categoryName
        }
      };

      this.errors = [];

      if (!this.payload.categoryName) {
        this.errors.push("Il n'y pas de catégorie définit");
      }

      if (this.payload.tasks.length) {
        this.payload.tasks.forEach(e => {
          if (!e.name) {
            this.errors.push("Il manque un nom à une tâche");
          }
          if (!e.description) {
            this.errors.push("Il manque description à une tâche");
          }
        });
      }
      if (!this.errors.length) {
        this.addCategoryProject(payload);
        this.$emit("closeModal");
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
  position: relative;
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

.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  color: grey;
}

@media screen and (max-width: 1400px) {
  .modal-container {
    width: 100%;
  }

  .modal-input > label {
    width: 100%;
  }
}

.close-icon:hover {
  cursor: pointer;
}
</style>
