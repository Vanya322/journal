import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import {AcademicPerformanceDto} from "../models/AcademicPerformance";

export default {
    name: "academicPerformancesModule",
    namespaced: true,
    actions: {
        async addOrSave(context, {
            academicPerformance,
            sciencePerformanceId,
        }) {
            try {
                await axios({
                    method: academicPerformance.id ? "put" : "post",
                    baseURL: academicPerformance.id
                        ? `${API_SERVER}/academicPerformances/${academicPerformance.id}`
                        : `${API_SERVER}/academicPerformances`,
                    ...bodyWithAuthHeader(),

                    data: {
                        ...AcademicPerformanceDto.toDto(academicPerformance),
                        sciencePerformanceId,
                    }
                });
            }
            catch(e) {
                handleHttpError(e);
            }
        },
    }
}
