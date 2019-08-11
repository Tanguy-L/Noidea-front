<template>
  <div class="modal">
    <h4 class="margin-height-24">Ajouter une nouvelle catégorie</h4>
    <div class="modal-container">
      <div class="modal-input margin-top-16">
        <label for="category-name">Nom de la catégorie: </label>
        <input v-model="categoryName" type="text" name="category-name" />
      </div>
    </div>
    <div v-for="(el, index) in tasks" :key="index" class="modal-container">
      <p style="width:100%;text-align:center;" class="margin-top-16">
        tâche {{ index + 1 }}
      </p>
      <div class="modal-input margin-top-16">
        <label for="name-task">Nom de la tâche: </label>
        <input v-model="el.name" type="text" name="name-task" />
      </div>
      <div class="modal-input margin-top-16">
        <label for="description-task">description : </label>
        <input
          v-model="el.description"
          type="textarea"
          name="description-task"
        />
      </div>
      <button class="red" @click="removeTask(index)">Supprimer tâche</button>
    </div>
    <div class="row-buttons">
      <button class="green" @click="addCategoryRequest()">Valider</button>
      <button class="blue" @click="addRowTask()">Ajouter une tache</button>
      <button class="red" @click="exitModal()">quitter</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    idUpdate: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      tasks: [],
      categoryName: ""
    };
  },
  methods: {
    exitModal() {
      this.$emit("closeModal");
    },
    addRowTask() {
      let randomTask = {
        name: "test",
        description: "test",
        done: false
      };
      this.tasks.push(randomTask);
    },
    removeTask(index) {
      return this.tasks.splice(index);
    },
    addTasks(idCategory) {
      let idUpdate = this.idUpdate;
      if (this.tasks.length > 0) {
        this.tasks.forEach(task => {
          task.category = idCategory;
          axios.post(
            "http://localhost:3000/v1/projects/" + idUpdate + "/tasks",
            {
              name: task.name,
              description: task.description,
              category: task.category,
              done: false
            }
          );
        });
      }
    },
    async addCategoryRequest() {
      let idCategory;
      try {
        const result = await axios.post("http://localhost:3000/v1/categories", {
          name: this.categoryName
        });
        idCategory = result.data._id;
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      }
      this.addTasks(idCategory);
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: white;
  box-shadow: 0 3px 12px black;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px;
}

input,
p,
label {
  color: black;
}

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
</style>
