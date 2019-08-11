import axios from "~/plugins/axios";

export const state = () => ({
  categories: [],
  updates: []
});

export const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setUpdates(state, payload) {
    state.updates = payload;
  }
};

export const actions = {
  async getCategories({ commit }) {
    let { data } = await axios.get("/v1/categories");
    commit("setCategories", data);
  },
  async fetchData({ commit }) {
    const { data } = await axios.get("/v1/projects");
    commit("setUpdates", data);
  },
  async addTask({ commit }) {
    commit("addTask");
  }
};

export const getters = {
  categories: state => {
    return state.categories;
  },
  updates: state => {
    return state.updates;
  }
};
