<template>
  <v-dialog v-model="open" width="500px">
    <v-card class="edit-student-dialog" :loading="loading">
      <v-card-title>
        {{
          student.id
            ? "Редактирование"
            : "Создание"
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Имя"
          :disabled="loading"
          v-model="student.name"
        ></v-text-field>
        <v-text-field
          label="Студенческий билет"
          :disabled="loading"
          type="number"
          v-model="student.studentTicket"
        ></v-text-field>
        <v-text-field
          label="Зачётная книжка"
          :disabled="loading"
          type="number"
          v-model="student.academicBook"
        ></v-text-field>
        <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="student.birthday"
              label="Дата рождения"
              :disabled="loading"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="student.birthday"
            no-title
          ></v-date-picker>
        </v-menu>
        <v-autocomplete
          v-model="student.group"
          label="Группа"
          :items="groups"
          return-object
          item-text="name"
          item-value="id"
          :disabled="disableGroup || loading"
        >
          <template v-slot:selection="{item}">
            {{item.name}}
          </template>
          <template v-slot:item="{item}">
            {{item.name}}
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="open = false"
          :disabled="loading"
        >Отменить</v-btn>
        <v-btn
          text
          color="primary"
          :disabled="disableSave || loading"
          @click="save()"
        >
          {{
            student.id
              ? "Изменить"
              : "Создать"
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";
import {Student} from "../../models/Student";

export default {
  name: "EditStudentDialog",

  data: () => ({
    open: false,
    dateMenu: false,

    student: {},
    disableGroup: false,
    loading: false,
  }),

  computed: {
    ...mapState("groupsModule", ["groups"]),

    disableSave() {
      return !this.student.name
        || !this.student.birthday
        || !this.student.studentTicket
        || !this.student.academicBook
        || !this.student.group
    }
  },

  methods: {
    openDialog(student, disableGroup) {
      this.disableGroup = disableGroup;
      this.student = new Student();
      this.student = Object.assign(this.student, student);
      this.open = true;
    },

    async save() {
      this.loading = true;
      await this.$store.dispatch("studentsModule/addOrSaveStudent", this.student)
      await this.$emit("onUpdate")
      this.loading = false;
      this.open = false;
    }
  }
}
</script>
