<template>
  <div class="container-task flex-center">
    <input v-model="isDone" type="checkbox" @input="taskDoneChange" />
    <div class="container flex-center">
      <div>
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
          class="material-icons task-button task-delete-button"
          @click="deleteTask()"
          >delete_forever</i
        >
        <i
          v-if="!showDescription"
          class="material-icons task-button"
          @click="showDescription = true"
          >keyboard_arrow_down</i
        >
        <i
          v-if="showDescription"
          class="material-icons task-button"
          @click="showDescription = false"
          >keyboard_arrow_up</i
        >
      </div>
      <p v-if="showDescription" class="task-description margin-top-8">
        {{ task.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    task: {
      type: Object,
      default: () => {
        return {};
      }
    },
    id: {
      type: String,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      isDone: this.task.done,
      showDescription: false
    };
  },
  methods: {
    ...mapActions(["removeTask", "updateTask"]),
    async deleteTask() {
      const payload = {
        taskId: this.task._id,
        updateId: this.id
      };
      this.removeTask(payload);
    },
    taskDoneChange() {
      const payload = {
        id: {
          task: this.task._id,
          update: this.id
        },
        body: {
          done: !this.isDone
        }
      };
      this.updateTask(payload);
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  justify-content: space-between;
  min-height: 48px;
}

.container-task {
  width: 100%;
  padding: 8px 16px;
  min-height: 56px;
  justify-content: space-between;
  margin: auto;
  align-items: baseline;
  border-top: #f2d388 solid 1px;
}

.task-right {
  flex-wrap: nowrap;
}

.task-description {
  font-size: 12px;
  width: 100%;
  margin: 0;
}

.task-button {
  background-color: rgba(0, 0, 0, 0);
}

.task-delete-button {
  color: #c85656;
}

.task-button:hover {
  cursor: pointer;
}
</style>
