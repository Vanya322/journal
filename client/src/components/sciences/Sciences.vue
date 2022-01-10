<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Предметы
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createScience">
          Добавить предмет
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="sciences"
          :loading="currentLoading"
          disable-pagination
          hide-default-footer
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editScience(item)">mdi-pencil</v-icon>
          <v-icon medium color="red" @click="deleteScience(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <ConfirmationDialog ref="confirmationDialog" />
    <EditDialog ref="editDialog" />
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Sciences",

  components: {
    ConfirmationDialog: () => import("../ConfirmationDialog"),
    EditDialog: () => import("./EditScienceDialog")
  },

  data: () => ({
    headers: [
      {
        text: "Название",
        value: "name"
      },
      {
        text: "",
        value: "actions"
      },
    ],
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("sciencesModule", ["sciences", "currentLoading"])
  },

  methods: {
    createScience() {
      this.$refs.editDialog.openDialog({});
    },

    editScience(science) {
      this.$refs.editDialog.openDialog(science);
    },

    deleteScience(science) {
      this.$refs.confirmationDialog.openDialog({
        header: `Удалить ${science.name}?`,
        cancelText: "Отменить",
        submitText: `Удалить`,
        submitColor: "red",
        onSubmit: () => {
          this.$store.dispatch("sciencesModule/deleteScience", science)
        },
      });
    },
  },

  mounted() {
    this.$store.dispatch("sciencesModule/loadPage");
  }
}
</script>
