<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Студенты
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            class="search-field mr-2"
            label="Поиск"
            v-model="searchString"
        ></v-text-field>
        <v-btn color="primary" @click="createStudent">
          Добавить студента
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="displayStudents"
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
    searchString: "",

    headers: [
      {
        text: "ФИО",
        value: "name",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "Группа",
        value: "group.name",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "Студенческий билет",
        value: "studentTicket",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "Зачётная книжка",
        value: "academicBook",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "Дата рождения",
        value: "birthday",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("studentsModule", ["students", "currentLoading"]),

    displayStudents() {
      const str = this.searchString.trim().toLowerCase();
      return str ? this.students.filter((student) => (
          (student.name.toLowerCase().includes(str))
          || (student.group.name.toLowerCase().includes(str))
          || (student.studentTicket.toLowerCase().includes(str))
          || (student.academicBook.toLowerCase().includes(str))
          || (student.birthday.toLowerCase().includes(str))
      )) : this.students
    }
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