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
    refreshToken: undefined,
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
      clearInterval(state.refreshToken);
    },
  },
  actions: {
    installRefreshToken({ state, dispatch }) {
      state.refreshToken = setInterval(() => {
        dispatch("refreshAccessToken")
      }, 1000 * 60 * 60)
    },

    async refreshAccessToken({ state, commit }) {
      try {
        const { data } = await axios.post(`${API_SERVER}/auth/login`, state.user);
        commit("updateAccessToken", data.token)
      }
      catch(e) {
        handleHttpError(e);
      }
    },

    async signIn({ commit, dispatch }, user) {
      commit("startAuth");
      try {
        const { data } = await axios.post(`${API_SERVER}/auth/login`, user);
        commit("updateUser", data)
        await router.push("/");
        dispatch("installRefreshToken")
      }
      catch(e) {
        handleHttpError(e);
      }
      commit("endAuth");
    },

    async signInWithToken({ commit, dispatch }, authToken) {
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
        dispatch("installRefreshToken")
      }
      catch(e) {
        handleHttpError(e);
      }
      commit("endAuth");
    },

    async signUp({ commit, dispatch }, user) {
      commit("startAuth");
      try {
        const data = await axios.post(`${API_SERVER}/auth/register`, user);
        commit("updateUser", data)
        await router.push("/");
        dispatch("installRefreshToken")
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
