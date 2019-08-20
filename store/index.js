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
    const { id, body } = payload;
    let updateCurrent = state.updates.find(e => e._id === id.update);
    const index = state.updates.indexOf(updateCurrent);
    state.updates[index].tasks.push(body);
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
  },
  REMOVE_CATEGORY_PROJECT(state, payload) {
    const updateCurrent = state.updates.find(e => e._id === payload.id.update);
    const updateIndex = state.updates.indexOf(updateCurrent);
    const taskToDeleteByIndex = [];
    let i = 0;

    const category = state.updates[updateIndex].categories.find(
      e => e === payload.id.category
    );

    if (category) {
      const indexCategory = state.updates[updateIndex].categories.indexOf(
        category
      );
      updateCurrent.tasks.forEach((task, index) => {
        if (task.category === category) {
          taskToDeleteByIndex.push(index);
        }
      });
      taskToDeleteByIndex.forEach(e => {
        Vue.delete(state.updates[updateIndex].tasks, e - i);
        i++;
      });
      Vue.delete(state.updates[updateIndex].categories, indexCategory);
    }
  },
  ADD_CATEGORY_PROJECT(state, payload) {
    const { idUpdate, idCategory } = payload;
    const currentCategory = state.categories.find(e => e._id === idCategory);
    const updateCurrent = state.updates.find(e => e._id === idUpdate);
    const updateIndex = state.updates.indexOf(updateCurrent);
    state.updates[updateIndex].categories.push(currentCategory._id);
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

  /*
  payload = {
    id: {
      update: ID,
      category: ID
    },
    body: {
      description: STRING
      name: STRING
    }
  }
  */
  async addTask({ commit }, payload) {
    const { id, body } = payload;
    const { data } = await axios.post(
      "/v1/projects/" + id.update + "/tasks",
      body
    );
    //Mongoose send all the document
    const manyTasks = data.tasks.filter(
      e => e.description === body.description
    );
    const uniqueTask = manyTasks.filter(e => e.name === body.name);
    let currentTask = payload;
    currentTask.body._id = uniqueTask[0]._id;
    commit("PUSH_TASK", currentTask);
  },

  /*
    payload = {
      id: {
        task: ID,
        update: ID
      },
      body: {
        done: Boolean,
        description: String,
        name: String
      }
    }
  */
  async updateTask({ commit }, payload) {
    await axios.put("/v1/projects/tasks/" + payload.id.task, payload.body);
    commit("EDIT_TASK", payload);
  },

  /*
    payload = {
      name: String
    }
  */
  async addCategory({ commit }, payload) {
    const { data } = await axios.post("/v1/categories", payload);
    commit("PUSH_CATEGORY", data);
  },

  /*
    payload = {
      id: {
        update: ID
      },
      body: {
        name:String
      }
    }
  */
  async addCategoryProject({ commit, state }, payload) {
    const currentCategory = state.categories.find(
      e => e.name === payload.body.name
    );
    if (!currentCategory) {
      const { data } = await axios.post("/v1/categories", payload.body);
      const newPayload = { idUpdate: payload.id.update, idCategory: data._id };
      await commit("PUSH_CATEGORY", data);
      await commit("ADD_CATEGORY_PROJECT", newPayload);
      await axios.patch("/v1/projects/" + payload.id.update + "/categories", {
        categories: [data._id]
      });
    } else {
      const currentCategory = state.categories.find(
        e => e.name === payload.body.name
      );
      const newPayload = {
        idUpdate: payload.id.update,
        idCategory: currentCategory._id
      };
      axios.patch("/v1/projects/" + payload.id.update + "/categories", {
        categories: [currentCategory._id]
      });
      commit("ADD_CATEGORY_PROJECT", newPayload);
    }
  },

  /*
    payload = {
      taskId = ID,
      updateId = ID
    }
  */
  async removeTask({ commit }, payload) {
    await axios.delete("/v1/projects/tasks/" + payload.taskId);
    commit("REMOVE_TASK", payload);
  },

  /*
    payload = {
      name: String,
      version: String
      date: Date
    }
  */
  async addUpdate({ commit }, payload) {
    const { data } = await axios.post("/v1/projects", {
      name: payload.name,
      version: payload.version,
      date: payload.date
    });
    commit("PUSH_UPDATE", data);
  },

  async removeCategoryFromProject({ commit }, payload) {
    await axios.patch(
      "v1/projects/" + payload.id.update + "/categories/remove",
      {
        categories: [payload.id.category]
      }
    );
    commit("REMOVE_CATEGORY_PROJECT", payload);
  },

  /*
    payload = IdUpdate (ID)
  */
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
  },
  categoriesById: state => payload => {
    return state.categories.find(e => e._id === payload._id);
  },
  indexOneCategory: state => payload => {
    let category = state.categories.find(e => e._id === payload);
    return state.categories.indexOf(category);
  },
  indexOneProject: state => payload => {
    let update = state.updates.find(e => e._id === payload);
    return state.updates.indexOf(update);
  }
};
