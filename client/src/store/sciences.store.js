import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import {Science} from "../models/Science";

export default {
    name: "sciencesModule",
    namespaced: true,
    state: {
        sciences: [],
        currentLoading: false,
    },

    mutations: {
        startLoading(state) {
            state.currentLoading = true;
        },
        endLoading(state) {
            state.currentLoading = false;
        },
        updateSciences(state, sciences) {
            state.sciences = sciences.map(it => Science.fromDto(it));
        },
    },

    actions: {
        async loadPage({ commit }) {
            commit("startLoading");
            try {
                const { data } = await axios({
                    method: "get",
                    baseURL: `${API_SERVER}/sciences`,
                    ...bodyWithAuthHeader(),
                });
                commit("updateSciences", data);
            }
            catch(e) {
                handleHttpError(e);
            }
            commit("endLoading");
        },

        async addOrSaveScience({ dispatch }, science) {
            try {
                await axios({
                    method: science.id ? "put" : "post",
                    baseURL: science.id
                        ? `${API_SERVER}/sciences/${science.id}`
                        : `${API_SERVER}/sciences`,
                    ...bodyWithAuthHeader(),

                    data: {
                        ...science,
                    }
                });
                dispatch("loadPage")
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async deleteScience({ dispatch }, science) {
            try {
                await axios({
                    method: "delete",
                    baseURL: `${API_SERVER}/sciences/${science.id}`,
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
