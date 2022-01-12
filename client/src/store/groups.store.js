import {Group} from "../models/Group";
import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";

export default {
    name: "groupsModule",
    namespaced: true,
    state: {
        groups: [],
        currentLoading: false,
    },
    mutations: {
        startLoading(state) {
            state.currentLoading = true;
        },
        endLoading(state) {
            state.currentLoading = false;
        },
        updateGroups(state, groups) {
            state.groups = groups.map(it => Group.fromDto(it));
        },
    },
    actions: {
        async loadPage({ commit }) {
            commit("startLoading");
            try {
                const { data } = await axios({
                    method: "get",
                    baseURL: `${API_SERVER}/groups`,
                    ...bodyWithAuthHeader(),
                });
                commit("updateGroups", data);
            }
            catch(e) {
                handleHttpError(e);
            }
            commit("endLoading");
        },

        async loadGroupById(context, groupId) {
            try {
                const { data } = await axios({
                    method: "get",
                    baseURL: `${API_SERVER}/groups/${groupId}`,
                    ...bodyWithAuthHeader(),
                });
                return data ? Group.fromDto(data) : undefined;
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async addOrSaveGroup({ dispatch }, group) {
            try {
                await axios({
                    method: group.id ? "put" : "post",
                    baseURL: group.id
                        ? `${API_SERVER}/groups/${group.id}`
                        : `${API_SERVER}/groups`,
                    ...bodyWithAuthHeader(),

                    data: {
                        id: group.id,
                        name: group.name,
                        dateStart: group.dateStart,
                        dateEnd: group.dateEnd,
                    }
                });
                dispatch("loadPage")
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async deleteGroup({ dispatch }, group) {
            try {
                await axios({
                    method: "delete",
                    baseURL: `${API_SERVER}/groups/${group.id}`,
                    ...bodyWithAuthHeader(),
                });
                dispatch("loadPage")
            }
            catch(e) {
                handleHttpError(e);
            }
        }
    }
}
