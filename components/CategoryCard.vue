<template>
  <div class="main-category flex-center margin-top-16 center-block">
    <i
      v-if="showCategory"
      class="material-icons expand"
      @click="showCategory = !showCategory"
    >
      expand_more
    </i>
    <i
      v-else
      class="material-icons expand"
      @click="showCategory = !showCategory"
    >
      expand_less
    </i>
    <h4 class="title-category margin-height-24">{{ category.name }}</h4>
    <div v-if="showCategory" class="flex-center" style="width:100%;">
      <div
        v-for="(task, index) in category.tasks"
        :key="index"
        class="container-task flex-center"
      >
        <input class="task-done" type="checkbox" />
        <div class="container flex-center">
          <div class="task-left">
            <p>{{ task.name }}</p>
          </div>
          <div class="task-right flex-center">
            <i
              v-if="false"
              style="margin-right: 5px;"
              class="material-icons task-button yellow"
              >edit</i
            >
            <i
              class="material-icons task-button red"
              @click="deleteRequestTask(task._id)"
              >delete_forever</i
            >
          </div>
          <p class="task-description margin-top-8">{{ task.description }}</p>
        </div>
      </div>
      <button
        v-if="!showFormTask"
        class="button-add-task blue center-block"
        @click="showFormTask = !showFormTask"
      >
        Ajouter une tâche
      </button>

      <button
        v-else
        class="button-add-task red center-block"
        @click="showFormTask = !showFormTask"
      >
        Annuler
      </button>
      <transition name="fade">
        <div v-if="showFormTask" class="form-task">
          <div class="full margin-top-8">
            <label for="name-task">nom: </label>
            <input id="name-task" v-model="taskToAdd.name" type="text" />
          </div>
          <div class="full margin-top-8">
            <label for="description-task">description: </label>
            <input
              id="description-task"
              v-model="taskToAdd.description"
              type="text"
            />
          </div>
          <button
            class="button-add-task center-block green margin-height-16"
            @click="AddTaskRequest"
          >
            Valider
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import { mapActions } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      default: () => {
        return {};
      }
    },
    idUpdate: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      showFormTask: false,
      taskToAdd: {
        name: "",
        description: ""
      },
      showCategory: false
    };
  },
  methods: {
    ...mapActions(["fetchData"]),
    async AddTaskRequest() {
      if (this.taskToAdd.name !== "" && this.taskToAdd.description !== "") {
        try {
          axios.post("v1/projects/" + this.idUpdate + "/tasks", {
            name: this.taskToAdd.name,
            description: this.taskToAdd.description,
            category: this.category._id,
            done: false
          });
        } catch (error) {
          console.log(error);
        }
        this.fetchData();
      }
    },
    async deleteRequestTask(id) {
      try {
        await axios.delete("v1/projects/tasks/" + id);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.main-category {
  background-color: white;
  width: 90%;
}

.main-category > input,
p,
label {
  color: black;
}

.container {
  width: 90%;
  justify-content: space-between;
  padding: 0 8px;
}

.title-category {
  width: 100%;
  text-align: center;
}

.task-right {
  flex-wrap: nowrap;
}

.container-task {
  width: 90%;
  padding: 0 16px;
  align-items: baseline;
  min-height: 56px;
}

.task-name {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-button {
  color: white;
  padding: 4px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.082);
}

.task-button:hover {
  cursor: pointer;
}

.task-description {
  font-size: 12px;
  width: 100%;
  margin: 0;
}
.button-add-task {
  height: 30px;
  width: 170px;
  font-family: "Montserrat", sans-serif;
  color: white;
  border: none;
  display: block;
}

.button-add-task:hover {
  cursor: pointer;
}

.form-task {
  width: 80%;
}

.full {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.full > input {
  width: 125px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.expand:hover {
  cursor: pointer;
}
</style>
