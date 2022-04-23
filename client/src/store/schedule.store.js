import axios from "axios";
import {Schedule} from "../models/Schedule";

export default {
  name: "scheduleModule",
  namespaced: true,
  state: {
    schedule: [],
  },
  mutations: {
    updateSchedule(state, schedule) {
      console.log(schedule)
      state.schedule = Schedule.fromDto(schedule);
      console.log(state.schedule)
    },
  },
  actions: {
    async loadSchedule({ commit }, { user, start, end }) {

      const params = new URLSearchParams();

      params.set("user", user);
      params.set("dstart", start);
      params.set("dfinish", end);

      try {
        const scheduleDto = await axios.get(`http://services.niu.ranepa.ru/wp-content/plugins/rasp/rasp_json_data.php?${params.toString()}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        });
        console.log(scheduleDto)
        commit("updateSchedule", scheduleDto)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
