<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Расписание
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="search-field mr-2"
          label="Группа или имя преподователя"
          v-model="searchString"
        ></v-text-field>
        <v-menu
          offset-y
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              class="search-field mr-2"
              label="Дата"
              prepend-icon="mdi-calendar"
              readonly
              v-model="displaySearchDates"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="searchDates"
            range
          ></v-date-picker>
        </v-menu>
        <v-btn
          color="primary"
          :disabled="disableSearch"
          @click="loadSchedule"
        >
          Поиск
        </v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="schedules"
        :loading="currentLoading"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:[`item.time`]="{ item }">
          <span class="pr-2">{{item.start}}</span>
            -
          <span class="pl-1">{{item.end}}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon medium color="red" @click="deleteUser(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import moment from "moment";
import {defaultDateFormat, defaultScheduleFormat} from "../utils/utils";

export default {
  name: "Schedule",

  data() {
    return {
      searchString: null,
      searchDates: [
        moment().day(7).format(defaultDateFormat),
        moment().day(0).format(defaultDateFormat)
      ],

      headers: [
        {
          text: "Дата",
          value: "date",
        },
        {
          text: "Время",
          value: "time",
        },
        {
          text: "Предмет",
          value: "science",
        },
        {
          text: "Группа",
          value: "groupName",
        },
        {
          text: "Аудитория",
          value: "room",
        },
        {
          text: "Преподаватель",
          value: "teacher",
        },
      ]
    }
  },

  watch: {
    searchDates() {
      const start = this.searchDates[0];
      const end = this.searchDates[1];

      if (!start || !end) return;

      if (moment(end).isBefore(start)) {
        this.searchDates = [end, start]
      }
    }
  },

  computed: {
    ...mapState("userModule", ["user"]),
    ...mapState("schedulesModule", ["schedules", "currentLoading"]),
    ...mapState("coreModule", ["drawer"]),

    disableSearch() {
      return !this.searchDates
        || !this.searchString
        || this.currentLoading;
    },

    displaySearchDates() {
      return this.searchDates.join(' - ')
    },
  },

  methods: {
    loadSchedule() {
      if(!this.searchString || !this.searchDates) return;

      this.$store.dispatch("schedulesModule/loadSchedule", {
        user: this.searchString,
        start: moment(this.searchDates[0]).format(defaultScheduleFormat),
        end: moment(this.searchDates[1]).format(defaultScheduleFormat),
      })
    }
  },

  mounted() {
    this.searchString = this.user.name;
    this.loadSchedule();
  }
}
</script>

<style scoped>

</style>
