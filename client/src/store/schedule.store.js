import axios from "axios";
import {Schedule} from "../models/Schedule";

export default {
  name: "schedulesModule",
  namespaced: true,
  state: {
    schedules: [],
  },
  mutations: {
    updateSchedules(state, schedules) {
      state.schedules = schedules.map(it => Schedule.fromDto(it));
      console.log(schedules)
      console.log(state.schedules)
    },
  },
  actions: {
    async loadSchedule({ commit }, { user, start, end }) {
      const params = new URLSearchParams();

      params.set("user", user);
      params.set("dstart", start);
      params.set("dfinish", end);

      try {
        const schedulesDto = await axios.get(`/niu-schedules`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          proxy: {
            host: '212.67.3.164',
            port: 80,
          },
          params,
        });

        commit("updateSchedules", schedulesDto.data.GetRaspGroupResult.RaspItem)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
