export default {

  name: "pagesModule",
  namespaced: true,
  state: {
    pages: [],
  },
  mutations: {
    setViewPages(state, pages) {
      state.pages = pages;
    },
  },
};
