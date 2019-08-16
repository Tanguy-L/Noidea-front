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
    <i
      class="material-icons delete-category red"
      @click="removeCategory(category._id)"
      >delete_forever</i
    >
    <div class="flex-center tasks-done">
      <p class="text-tasks-done">
        {{ tasksDone }} / {{ tasksByCategories.length }}
      </p>
      <i class="material-icons text-tasks-done">
        check_circle_outline
      </i>
    </div>
    <h4 class="title-category margin-height-24">{{ category.name }}</h4>
    <div v-if="showCategory" class="flex-center" style="width:100%;">
      <TaskCard
        v-for="(task, index) in tasksByCategories"
        :id="id"
        :key="index"
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
      type: Object,
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
        description: ""
      },
      showCategory: false,
      payload: {
        update: this.id,
        category: this.category._id
      }
    };
  },
  computed: {
    ...mapGetters(["tasks"]),
    tasksByCategories() {
      return this.tasks(this.payload);
    },
    tasksDone() {
      const result = this.tasksByCategories.filter(e => e.done === true);
      return result.length;
    }
  },
  methods: {
    ...mapActions(["addTask", "removeCategory"]),
    async addTaskRequest() {
      if (this.taskToAdd.name !== "" && this.taskToAdd.description !== "") {
        const taskInfos = {
          category: this.category._id,
          update: this.id,
          ...this.taskToAdd
        };
        await this.addTask(taskInfos);
      }
    }
  }
};
</script>

<style scoped>
.main-category {
  background-color: white;
  width: 90%;
  position: relative;
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

.button-add-task {
  height: 30px;
  width: 170px;
  font-family: "Montserrat", sans-serif;
  color: white;
  border: none;
  display: block;
}

p {
  color: black;
}

.delete-category {
  position: absolute;
  right: 0;
  color: white;
}

.delete-category:hover {
  cursor: pointer;
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
}

.tasks-done {
  width: 100%;
  justify-content: flex-start;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.expand:hover {
  cursor: pointer;
}
</style>
