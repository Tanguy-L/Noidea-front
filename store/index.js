export const state = () => ({
  progress: 0,
  status: "Nothing happened now !"
});

export const mutations = {
  SET_PROGRESS(state, progress) {
    state.progress = progress;
  },
  SET_STATUS(state, status) {
    console.log(status);

    state.status = status.data;
  }
};

export const actions = {};

export const getters = {};
