<template>
  <v-container
    :class="drawer ? 'drawer-open' : 'drawer-closed'"
    class="group-page"
  >
    <v-card v-if="targetGroup">
      <v-toolbar flat>
        <v-toolbar-title>
          Группа {{targetGroup.name}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="user.isAdmin"
          text
          small
          @click="addScience"
        >Добавить предмет</v-btn>
        <v-btn
          v-if="user.isAdmin"
          text
          small
          @click="addStudent"
        >Добавить студента</v-btn>
        <v-menu
            ref="dateRangeMenu"
            v-model="dateRangeMenu"
            :close-on-content-click="false"
            :return-value.sync="selectedDatesRange"
            transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="date-container">
              <v-combobox
                  v-model="selectedDatesRange"
                  multiple
                  chips
                  label="Интервал дат"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-combobox>
              <v-text-field
                  v-model="selectedDatesRange"
                  class="closed-input"
                  multiple
                  chips
                  small-chips
                  label="Интервал дат"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker v-model="selectedDatesRange" range no-title>
            <v-spacer></v-spacer>
            <v-btn text @click="dateRangeMenu = false">
              Закрыть
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="saveDatesRange(selectedDatesRange.sort())"
            >
              Подтвердить
            </v-btn>
          </v-date-picker>
        </v-menu>
        <template v-slot:extension>
          <v-tabs
              v-model="selectedTab"
              align-with-title
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
                v-if="targetGroup"
                class="ml-0 black--text"
                v-for="item in targetGroup.sciencePerformances"
                :key="item.id"
            >
              {{ item.science.name }}
              <v-icon small @click="deleteScienceFromGroup(item)">mdi-close</v-icon>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="false"
        disable-pagination
        hide-default-footer
        disable-sort
      >
        <template v-slot:[`item.student`]="{ item }">
          {{item.student.name}}
        </template>

        <template
            v-for="(date, index) in dateHeaders"
            v-slot:[`item.${date.value}`]="{ item }"
        >
          <div :key="index" v-if="targetGroup && targetGroup.sciencePerformances[selectedTab]">
            <EditField
              :academicPerformance="getAcademicPerformance(item.student, date.value)"
              :groupId="targetGroup.id"
              :sciencePerformanceId="targetGroup.sciencePerformances[selectedTab].id"
              @onUpdate="loadTargetGroup"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-overlay
      :class="[drawer ? 'drawer-open' : 'drawer-closed', {'content-col':drawer}]"
      v-else
      color="white"
    >
      <v-progress-circular
        :size="70"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <AddScienceDialog
      ref="addScienceDialog"
      :group="targetGroup"
      @onUpdate="loadTargetGroup"
    />
    <AddStudentDialog ref="addStudentDialog" @onUpdate="loadTargetGroup" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import {defaultDateFormat} from "../../utils/utils"
import moment from "moment";
import Vue from "vue";

export default {
  name: "Journal",

  components: {
    EditField: () => import("./EditField"),
    AddScienceDialog: () => import("./AddScienceDialog"),
    AddStudentDialog: () => import("../students/EditStudentDialog")
  },

  data: () => ({
    targetGroup: undefined,
    selectedDatesRange: [
      moment().day(0).format(defaultDateFormat),
      moment().day(6).format(defaultDateFormat),
    ],
    dateRangeMenu: false,
    selectedTab: 0,
    loading: false,
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("userModule", ["user"]),
    dateHeaders() {
      return [...this.headers].splice(1, this.headers.length);
    },

    items() {
      return this.targetGroup.sciencePerformances[this.selectedTab]
        ? this.defaultItems
        : [];
    },

    headers() {
      const headers = [
        {
          text: "Студент",
          value: "student"
        }
      ];

      const { startDate, endDate } = this.getCorrectHeaderDates();

      for (let m = startDate; m.diff(endDate) <= 0; m.add(1, "days")) {
        headers.push({
          text: m.format(defaultDateFormat),
          value: m.format(defaultDateFormat),
        });
      }

      return headers;
    },

    defaultItems() {
      return this.targetGroup
        ? this.targetGroup.students.map((it) => ({
            student: it,
          }))
        : [];
    },
  },

  methods: {
    addScience() {
      this.$refs.addScienceDialog.openDialog();
    },

    addStudent() {
      this.$refs.addStudentDialog.openDialog({
        group: this.targetGroup
      }, true)
    },

    deleteScienceFromGroup(sciencePerformances) {
      this.$refs.confirmationDialog.openDialog({
        header: "Удаление",
        text: `Вы уверены, что хотите удалить ${sciencePerformances.science.name}?`,
        cancelText: "Отменить",
        submitText: `Удалить`,
        submitColor: "red",
        onSubmit: async () => {
          await this.$store.dispatch("sciencePerformancesModule/deleteSciencePerformance", sciencePerformances)
          await this.loadTargetGroup();
        },
      });
    },

    async loadTargetGroup() {
      this.loading = true;
      this.targetGroup = await this.$store.dispatch("groupsModule/loadGroupById", this.$route.params.id)
      this.loading = false;
    },

    saveDatesRange(range) {
      if (range.length !== 2) {
        Vue.toasted.error(
            "Не корректный интервал!", {
              duration: 3000,
            },
        );
        return;
      }

      this.$refs.dateRangeMenu.save(range);
    },

    getCorrectHeaderDates() {
      const selectedDatesRange = [...this.selectedDatesRange].sort();

      let startDate;
      let endDate;

      if (selectedDatesRange.length === 1) {
        if (moment(selectedDatesRange[0]).isSameOrBefore(moment())) {
          startDate = moment(selectedDatesRange[0]);
          endDate = moment();
        } else {
          startDate = moment();
          endDate = moment(selectedDatesRange[0]);
        }
      } else {
        startDate = moment(selectedDatesRange[0]);
        endDate = moment(selectedDatesRange[1]);
      }

      return { startDate, endDate };
    },

    getAcademicPerformance(student, date) {
      const sciencePerformance = this.targetGroup.sciencePerformances[this.selectedTab]
      const foundItem = sciencePerformance.academicPerformances.find(it => (
              it.student.id === student.id
              && moment(it.date).isSame(date)
          ))
      return  foundItem || {
        student,
        date,
      }
    }
  },

  mounted() {
    this.loadTargetGroup();
    this.$store.dispatch("sciencesModule/loadPage");
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
.group-page {
  .v-menu__content.theme--dark.menuable__content__active {
    z-index: 999 !important;
  }
  .file-input {
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
    top: -50%;
    left: -16px;
    width: calc(100% + 32px);
    height: 36px;
    cursor: pointer !important;
  }
  @media screen and (max-width: 425px) {
    .v-toolbar__title {
      max-width: 80px !important;
    }
  }
  @media screen and (max-width: 350px) {
    .v-toolbar__title {
      max-width: 50px !important;
    }
  }
  .file-input::-webkit-file-upload-button {
    cursor: pointer;
  }

  .v-toolbar .v-input {
    margin-top: 25px;
  }

  .date-container {
    position: relative;
    .v-text-field.closed-input {
      opacity: 0;
      filter: alpha(opacity=0);
      position: absolute;
      top: -5%;
      left: 0;
      width: calc(100% + 32px);
      cursor: pointer !important;
    }
    input {
      width: 0 !important;
      min-width: 0 !important;
    }
    .v-text-field .v-input__append-inner {
      display: none;
    }
  }

  .data-calendar.v-data-table > .v-data-table__wrapper > table {
    thead > tr:last-child > th:not(:first-child) {
      text-align: center !important;
      white-space: nowrap !important;
    }
    thead.v-data-table-header > tr:last-child > th:first-child,
    tbody > tr > td:first-child {
      position: sticky !important;
      left: 0 !important;
      min-width: 200px !important;
      display: flex;
      align-items: center;
      background-color: map-get($material-dark-elevation-colors, "1");
      z-index: 8;
    }
  }
}
</style>
