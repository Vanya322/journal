import axios from "axios";
import router from "../router";
import { store } from "../main"
import {
  getLocalStorageData,
  setLocalStorageData,
  API_SERVER,
  handleHttpError
} from "../utils/utils";
import {User} from "../models/User";

const storageAuthKey = "auth.user.key"

export default {
  name: "userModule",
  namespaced: true,
  state: {
    authInProgress: false,
    user: undefined,
    accessToken: undefined,
  },
  mutations: {
    startAuth(state) {
      state.authInProgress = true;
    },

    endAuth(state) {
      state.authInProgress = false;
    },

    updateAccessToken(state, token) {
      state.accessToken = token;
    },

    updateUser(state, { user, token, authToken }) {
      state.user = User.fromDto(user);
      state.accessToken = token;
      if (authToken) {
        setLocalStorageData(storageAuthKey, authToken);
      }
      if(!store.state.coreModule.drawer) {
        store.commit("coreModule/toggleDrawer")
      }
    },

    clearUser(state) {
      state.user = undefined;
      setLocalStorageData(storageAuthKey, "");
    },
  },
  actions: {
    async refreshAccessToken({ commit }) {
      try {
        const { data } = await axios.post(`${API_SERVER}/auth/login`, user);
        commit("updateAccessToken", data.token)
      }
      catch(e) {
        handleHttpError(e);
      }
    },

    async signIn({ commit }, user) {
      commit("startAuth");
      try {
        const { data } = await axios.post(`${API_SERVER}/auth/login`, user);
        commit("updateUser", data)
        await router.push("/");
      }
      catch(e) {
        handleHttpError(e);
      }
      commit("endAuth");
    },

    async signInWithToken({ commit }, authToken) {
      commit("startAuth");
      try {
        const { data } = await axios({
          method: "post",
          baseURL: `${API_SERVER}/auth/login`,
          headers: {
            Authorization: authToken,
          },
        });
        commit("updateUser", data);
      }
      catch(e) {
        handleHttpError(e);
      }
      commit("endAuth");
    },

    async signUp({ commit }, user) {
      commit("startAuth");
      try {
        const data = await axios.post(`${API_SERVER}/auth/register`, user);
        commit("updateUser", data)
        await router.push("/");
      }
      catch(e) {
        handleHttpError(e);
      }
      commit("endAuth");
    },

    async checkTokenAndSignIn({ dispatch }) {
      const authToken = getLocalStorageData(storageAuthKey);

      if(authToken) {
        await dispatch("signInWithToken", authToken)
      }
    },

    async signOut({ commit }) {
      commit("startAuth");

      commit("clearUser");

      router.push("/login");
      commit("endAuth");
    },
  },
  getters: {
    accessToken: (state) => state.accessToken,
  },
};
