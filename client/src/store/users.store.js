import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import {User} from "../models/User";

export default {
    name: "usersModule",
    namespaced: true,
    state: {
        users: [],
        currentLoading: false,
    },

    mutations: {
        startLoading(state) {
            state.currentLoading = true;
        },
        endLoading(state) {
            state.currentLoading = false;
        },
        updateUsers(state, users) {
            state.users = users.map(it => User.fromDto(it));
        },
    },

    actions: {
        async loadPage({ commit }) {
            commit("startLoading");
            try {
                const { data } = await axios({
                    method: "get",
                    baseURL: `${API_SERVER}/users`,
                    ...bodyWithAuthHeader(),
                });
                commit("updateUsers", data);
            }
            catch(e) {
                handleHttpError(e);
            }
            commit("endLoading");
        },

        async addOrSaveUser({ dispatch }, { user, oldPassword }) {
            try {
                await axios({
                    method: user.id ? "put" : "post",
                    baseURL: user.id
                        ? `${API_SERVER}/users/${user.id}`
                        : `${API_SERVER}/users`,
                    ...bodyWithAuthHeader(),

                    data: {
                        ...user,
                        type: user.type.value,
                        oldPassword,
                    }
                });
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async deleteUser({ dispatch }, user) {
            try {
                await axios({
                    method: "delete",
                    baseURL: `${API_SERVER}/users/${user.id}`,
                    ...bodyWithAuthHeader(),
                });
                dispatch("loadPage")
            }
            catch(e) {
                handleHttpError(e);
            }
        },
    }
}
