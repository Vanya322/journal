<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Пользователи
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="search-field mr-2"
          label="Поиск"
          v-model="searchString"
        ></v-text-field>
        <v-btn color="primary" @click="createUser">
          Добавить пользователя
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="displayUsers"
          :loading="currentLoading"
          disable-pagination
          hide-default-footer
      >
        <template v-slot:[`item.type`]="{ item }">
          {{item.type.text}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon medium color="red" @click="deleteUser(item)">mdi-delete</v-icon>
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
  name: "Users",

  components: {
    ConfirmationDialog: () => import("../ConfirmationDialog"),
    EditDialog: () => import("./EditUserDialog")
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
        text: "Почта",
        value: "email",
        sort: (a, b) => {
          return a.localeCompare(b);
        },
      },
      {
        text: "Тип",
        value: "type",
        sort: (a, b) => {
          return a.text.localeCompare(b.text);
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
    ...mapState("usersModule", ["users", "currentLoading"]),

    displayUsers() {
      const str = this.searchString.trim().toLowerCase();
      return str ? this.users.filter((user) => (
          (user.name.toLowerCase().includes(str))
          || (user.email.toLowerCase().includes(str))
          || (user.type.text.toLowerCase().includes(str))
      )) : this.users
    }
  },

  methods: {
    loadPage() {
      this.$store.dispatch("usersModule/loadPage");
    },

    createUser() {
      this.$refs.editDialog.openDialog({});
    },

    editUser(user) {
      this.$refs.editDialog.openDialog(user);
    },

    deleteUser(user) {
      this.$refs.confirmationDialog.openDialog({
        header: "Удаление",
        text: `Вы уверены, что хотите удалить ${user.name}?`,
        cancelText: "Отменить",
        submitText: `Удалить`,
        submitColor: "red",
        onSubmit: () => {
          this.$store.dispatch("usersModule/deleteUser", user)
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