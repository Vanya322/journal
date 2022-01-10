import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import {SciencePerformanceDto} from "../models/SciencePerformance";

export default {
    name: "sciencePerformancesModule",
    namespaced: true,
    actions: {
        async addScience(context, {
            science,
            group,
        }) {
            try {
                await axios({
                    method: "post",
                    baseURL: `${API_SERVER}/sciencePerformances`,
                    ...bodyWithAuthHeader(),

                    data: {
                        ...SciencePerformanceDto.toDto(undefined, science, group),
                    }
                });
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async deleteSciencePerformance(context, sciencePerformance) {
            try {
                await axios({
                    method: "delete",
                    baseURL: `${API_SERVER}/sciencePerformances/${sciencePerformance.id}`,
                    ...bodyWithAuthHeader(),
                });
            }
            catch(e) {
                handleHttpError(e);
            }
        }
    }
}
