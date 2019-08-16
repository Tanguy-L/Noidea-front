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
        <i class="material-icons task-button red" @click="deleteTask()"
          >delete_forever</i
        >
      </div>
      <p class="task-description margin-top-8">{{ task.description }}</p>
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
      isDone: this.task.done
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
  padding: 0 8px;
}
.container-task {
  width: 100%;
  padding: 0 16px;
  align-items: baseline;
  min-height: 56px;
  width: 90%;
  justify-content: space-between;
  padding: 0 8px;
}

p {
  color: black;
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
  color: white;
  padding: 4px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.082);
}

.task-button:hover {
  cursor: pointer;
}
</style>
