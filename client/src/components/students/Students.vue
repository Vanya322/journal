<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Студенты
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createStudent">
          Добавить студента
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="students"
          :loading="currentLoading"
          disable-pagination
          hide-default-footer
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editStudent(item)">mdi-pencil</v-icon>
          <v-icon medium color="red" @click="deleteStudent(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <ConfirmationDialog ref="confirmationDialog" />
    <EditDialog ref="editDialog" @onUpdate="loadPage" />
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Students",

  components: {
    ConfirmationDialog: () => import("../ConfirmationDialog"),
    EditDialog: () => import("./EditStudentDialog")
  },

  data: () => ({
    headers: [
      {
        text: "ФИО",
        value: "name"
      },
      {
        text: "Группа",
        value: "group.name"
      },
      {
        text: "Студенческий билет",
        value: "studentTicket"
      },
      {
        text: "Зачётная книжка",
        value: "academicBook"
      },
      {
        text: "Дата рождения",
        value: "birthday"
      },
      {
        text: "",
        value: "actions"
      },
    ],
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("studentsModule", ["students", "currentLoading"])
  },

  methods: {
    loadPage() {
      this.$store.dispatch("studentsModule/loadPage");
    },

    createStudent() {
      this.$refs.editDialog.openDialog({});
    },

    editStudent(student) {
      this.$refs.editDialog.openDialog(student);
    },

    deleteStudent(student) {
      this.$refs.confirmationDialog.openDialog({
        header: "Удаление",
        text: `Вы уверены, что хотите удалить ${student.name}?`,
        cancelText: "Отменить",
        submitText: `Удалить`,
        submitColor: "red",
        onSubmit: () => {
          this.$store.dispatch("studentsModule/deleteStudent", student)
        },
      });
    },
  },

  mounted() {
    this.loadPage();
  }
}
</script>

<style scoped>

</style>