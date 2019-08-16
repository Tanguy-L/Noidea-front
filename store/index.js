import axios from "~/plugins/axios";
import Vue from "vue";

export const state = () => ({
  categories: [],
  updates: []
});

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_UPDATES(state, payload) {
    state.updates = payload;
  },
  PUSH_TASK(state, payload) {
    const { update, ...task } = payload;
    let updateCurrent = state.updates.find(e => e._id === update);
    const index = state.updates.indexOf(updateCurrent);
    const newTask = {
      ...task,
      done: false
    };
    state.updates[index].tasks.push(newTask);
  },
  PUSH_CATEGORY(state, payload) {
    state.categories.push(payload);
  },
  REMOVE_TASK({ updates }, payload) {
    const updateCurrent = updates.find(e => e._id === payload.updateId);
    const index = updates.indexOf(updateCurrent);
    const taskCurrent = updates[index].tasks.find(
      e => e._id === payload.taskId
    );
    const indexTask = updates[index].tasks.indexOf(taskCurrent);
    Vue.delete(updates[index].tasks, indexTask);
  },
  PUSH_UPDATE({ updates }, payload) {
    updates.push(payload);
  },
  REMOVE_CATEGORY(state, payload) {
    const category = state.categories.find(e => e._id === payload._id);
    const indexCategory = state.categories.indexOf(category);
    state.categories.splice(indexCategory, 1);

    state.updates.forEach((update, indexUpdate) => {
      update.tasks.forEach((task, indexTask) => {
        if (task.category === payload._id) {
          Vue.delete(state.updates[indexUpdate].tasks, indexTask);
        }
      });
    });
  },
  REMOVE_UPDATE(state, payload) {
    const index = state.updates.findIndex(e => e._id === payload);
    Vue.delete(state.updates, index);
  },
  EDIT_TASK(state, payload) {
    const { id, body } = payload;
    const updateCurrent = state.updates.find(e => e._id === id.update);
    const index = state.updates.indexOf(updateCurrent);
    const taskCurrent = state.updates[index].tasks.find(e => e._id === id.task);
    const indexTask = state.updates[index].tasks.indexOf(taskCurrent);
    Object.keys(body).forEach(e => {
      Vue.set(state.updates[index].tasks[indexTask], e, body[e]);
    });
  }
};

export const actions = {
  async fetchCategories({ commit }) {
    let { data } = await axios.get("/v1/categories");
    commit("SET_CATEGORIES", data);
  },
  async fetchData({ commit }) {
    const { data } = await axios.get("/v1/projects");
    commit("SET_UPDATES", data);
  },
  async addTask({ commit }, payload) {
    const { update, ...task } = payload;
    const sendTask = {
      ...task,
      done: false
    };
    const { data } = await axios.post(
      "/v1/projects/" + update + "/tasks",
      sendTask
    );
    const manyTasks = data.tasks.filter(
      e => e.description === task.description
    );
    const uniqueTask = manyTasks.filter(e => e.name === task.name);
    let currentTask = payload;
    currentTask._id = uniqueTask[0]._id;
    commit("PUSH_TASK", currentTask);
  },
  async updateTask({ commit }, payload) {
    const response = await axios.put(
      "/v1/projects/tasks/" + payload.id.task,
      payload.body
    );
    console.log(response);
    commit("EDIT_TASK", payload);
  },
  async addCategory({ commit }, payload) {
    await axios.post("/v1/categories", payload);
    commit("PUSH_CATEGORY", payload);
  },
  async removeTask({ commit }, payload) {
    await axios.delete("/v1/projects/tasks/" + payload.taskId);
    commit("REMOVE_TASK", payload);
  },
  async addUpdate({ commit }, payload) {
    const { data } = await axios.post("/v1/projects", {
      name: payload.name,
      version: payload.version,
      date: payload.date
    });
    commit("PUSH_UPDATE", data);
  },
  async addCategoryAndTasks({ commit, dispatch }, payload) {
    const { data } = await axios.post("/v1/categories", {
      name: payload.categoryName
    });
    commit("PUSH_CATEGORY", data);
    payload.tasks.forEach(task => {
      task.category = data._id;
      dispatch("addTask", task);
    });
  },
  async removeCategory({ commit }, payload) {
    await axios.delete("/v1/categories/" + payload);
    commit("REMOVE_CATEGORY", payload);
  },
  async removeProject({ commit }, payload) {
    await axios.delete("/v1/projects/" + payload);
    commit("REMOVE_UPDATE", payload);
  }
};

export const getters = {
  categories: state => {
    return state.categories;
  },
  updates: state => {
    return state.updates;
  },
  updateByIndex: state => id => {
    return state.updates.find(update => update._id === id);
  },
  tasks: state => payload => {
    let update = state.updates.find(e => e._id === payload.update);
    return update.tasks.filter(e => e.category === payload.category);
  },
  categoriesByName: state => payload => {
    return state.categories.find(e => e.name === payload.name);
  }
};
