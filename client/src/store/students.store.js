import axios from "axios";
import {API_SERVER, bodyWithAuthHeader, handleHttpError} from "../utils/utils";
import {Student, StudentDto} from "../models/Student";
import { store } from "../main";

export default {
    name: "studentsModule",
    namespaced: true,
    state: {
        students: [],
        currentLoading: false,
    },

    mutations: {
        startLoading(state) {
            state.currentLoading = true;
        },
        endLoading(state) {
            state.currentLoading = false;
        },
        async updateStudents(state, {students, groups}) {
            state.students = students.map(it => {
                const group = groups.find(group => (
                    group.students.some(student => student.id === it.id)
                ))
                return Student.fromDto(it, group);
            });
        },
    },

    actions: {
        async loadPage({ commit, dispatch }) {
            commit("startLoading");
            try {
                const { data } = await axios({
                    method: "get",
                    baseURL: `${API_SERVER}/students`,
                    ...bodyWithAuthHeader(),
                });
                const groups = await dispatch("getGroups", data);
                commit("updateStudents", { students: data, groups });
            }
            catch(e) {
                handleHttpError(e);
            }
            commit("endLoading");
        },

        async addOrSaveStudent({ dispatch }, student) {
            try {
                await axios({
                    method: student.id ? "put" : "post",
                    baseURL: student.id
                        ? `${API_SERVER}/students/${student.id}`
                        : `${API_SERVER}/students`,
                    ...bodyWithAuthHeader(),

                    data: {
                        ...StudentDto.toDto(student),
                    }
                });
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async deleteStudent({ dispatch }, student) {
            try {
                await axios({
                    method: "delete",
                    baseURL: `${API_SERVER}/students/${student.id}`,
                    ...bodyWithAuthHeader(),
                });
                dispatch("loadPage")
            }
            catch(e) {
                handleHttpError(e);
            }
        },

        async getGroups(context) {
            try {
                await store.dispatch("groupsModule/loadPage");
                return store.state.groupsModule.groups;
            }
            catch(e) {
                handleHttpError(e);
            }
            return [];
        }
    }
}
