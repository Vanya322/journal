import { IS_MOBILE } from "../utils/utils";

export default {
  name: "coreModule",
  namespaced: true,
  state: {
    drawer: !IS_MOBILE,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },

    drawerLinkClicked(state) {
      if (IS_MOBILE) {
        state.drawer = false;
      }
    }
  }
}
