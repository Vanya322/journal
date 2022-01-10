<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Пользователи
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createUser">
          Добавить пользователя
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="users"
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
    headers: [
      {
        text: "ФИО",
        value: "name"
      },
      {
        text: "Почта",
        value: "email"
      },
      {
        text: "Тип",
        value: "type"
      },
      {
        text: "",
        value: "actions"
      },
    ],
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("usersModule", ["users", "currentLoading"])
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