<template>
  <div class="main-category flex-center margin-top-16 center-block">
    <h4 class="title-category margin-height-24">{{ categoryFull.name }}</h4>
    <div class="flex-center">
      <div class="flex-center tasks-done">
        <p class="text-tasks-done">
          {{ tasksDone }} / {{ tasksByCategories.length }}
        </p>
        <i class="material-icons text-tasks-done">
          check_circle_outline
        </i>
      </div>
      <i class="material-icons delete-category red" @click="deleteCategory()"
        >delete_forever</i
      >
    </div>
    <div class="container-show-arrow">
      <i
        v-if="showCategory"
        class="material-icons expand hide"
        @click="showCategory = !showCategory"
      >
        arrow_drop_down_circle
      </i>
      <i
        v-else
        class="material-icons expand"
        @click="showCategory = !showCategory"
      >
        arrow_drop_down_circle
      </i>
    </div>
    <transition name="fade">
      <div
        v-if="showCategory"
        class="flex-center container-tasks"
        style="width:100%;"
      >
        <TaskCard
          v-for="(task, index) in tasksByCategories"
          :id="id"
          :key="index + '-' + task.name"
          :task="task"
        />
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
            <div v-if="errors.length">
              <p>Pensez à corriger les erreurs suivantes :</p>
              <ul>
                <li v-for="error in errors" :key="error.index">{{ error }}</li>
              </ul>
            </div>
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
              @click="addTaskRequest()"
            >
              Valider
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import TaskCard from "@/components/Cards/TaskCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TaskCard
  },
  props: {
    category: {
      type: String,
      default: () => {
        return {};
      }
    },
    id: {
      type: String,
      default: () => {
        return "test";
      }
    }
  },
  data() {
    return {
      showFormTask: false,
      taskToAdd: {
        name: "",
        description: "",
        done: false
      },
      showCategory: false,
      payload: {
        update: this.id,
        category: this.category
      },
      errors: []
    };
  },
  computed: {
    ...mapGetters([
      "tasks",
      "categoriesById",
      "indexOneCategory",
      "indexOneProject"
    ]),
    tasksByCategories() {
      return this.tasks(this.payload);
    },
    categoryFull() {
      return this.categoriesById({ _id: this.category });
    },
    tasksDone() {
      const result = this.tasksByCategories.filter(e => e.done === true);
      return result.length;
    }
  },
  methods: {
    ...mapActions(["addTask", "removeCategoryFromProject"]),
    async addTaskRequest() {
      this.errors = [];

      if (!this.taskToAdd.name) {
        this.errors.push("Votre tâche n'a pas de nom");
      }

      if (!this.taskToAdd.description) {
        this.errors.push("Votre tâche n'a pas de description");
      }

      if (!this.errors.length) {
        const taskInfos = {
          id: {
            category: this.categoryFull._id,
            update: this.id
          },
          body: {
            ...this.taskToAdd,
            category: this.categoryFull._id
          }
        };
        await this.addTask(taskInfos);
        this.showFormTask = !this.showFormTask;
      }
    },
    deleteCategory() {
      const payload = {
        id: {
          update: this.id,
          category: this.category
        }
      };
      this.removeCategoryFromProject(payload);
    }
  }
};
</script>

<style scoped>
.main-category {
  background-color: rgba(255, 255, 255, 0);
  width: 90%;
  position: relative;
  border: #f2d388 solid 2px;
  color: white;
}

.main-category > input,
p,
label {
  color: white;
}

.container {
  width: 90%;
  justify-content: space-between;
  padding: 0 8px;
}

.title-category {
  width: 100%;
  text-align: center;
  margin-top: 32px;
}

.button-add-task {
  width: 170px;
  font-family: "Montserrat", sans-serif;
  color: white;
  border: none;
  display: block;
}

.container-show-arrow {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.delete-category {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
}

.delete-category:hover {
  cursor: pointer;
}

.hide {
  transform: rotate(0.5turn);
}

.task-right {
  flex-wrap: nowrap;
}

.task-description {
  font-size: 12px;
  width: 100%;
  margin: 0;
}

.button-add-task:hover {
  cursor: pointer;
}

.form-task {
  width: 80%;
  margin: auto;
}

.tasks-done {
  justify-content: flex-start;
}

.flex-center {
  justify-content: space-between;
}

.text-tasks-done {
  margin-left: 8px;
}

.full {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.full > input {
  width: 125px;
}

.expand:hover {
  cursor: pointer;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-out;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-enter-to,
.list-leave {
  opacity: 1;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 200ms ease-out;
}
</style>
