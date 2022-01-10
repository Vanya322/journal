import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import { store } from "../main";

export default {
    name: "academicPerformanceModule",
    namespaced: true,
    actions: {
        async addOrSave(context, {
            academicPerformance,
            groupId,
            sciencePerformanceId,
        }) {
            try {
                const { data } = await axios({
                    method: academicPerformance.id ? "put" : "post",
                    baseURL: academicPerformance.id
                        ? `${API_SERVER}/academicPerformances/${academicPerformance.id}`
                        : `${API_SERVER}/academicPerformances`,
                    ...bodyWithAuthHeader(),
                }, {
                    ...academicPerformance
                });
                store.commit("groupsModule/updateAcademicPerformance", {
                    academicPerformance: data,
                    groupId,
                    sciencePerformanceId,
                })
            }
            catch(e) {
                handleHttpError(e);
            }
        },
    }
}
