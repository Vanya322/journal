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
        updateAcademicPerformance(state, {
            academicPerformance,
            groupId,
            sciencePerformanceId,
        }) {
            const foundSciencePerformance = state.groups.find((it) => it.id === groupId)
                .sciencePerformances.find(it => it.id === sciencePerformanceId);

            const foundIndex = foundSciencePerformance.academicPerformances
                .findIndex(it => it.id === academicPerformance.id)
            if(foundIndex !== -1) {
                foundSciencePerformance.academicPerformances.splice(foundIndex, 1, academicPerformance)
            } else {
                foundSciencePerformance.academicPerformances.push(academicPerformance)
            }
        }
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
        }
    }
}
