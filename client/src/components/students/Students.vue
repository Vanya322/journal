<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Студенты
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary">
          Добавить студента
        </v-btn>
      </v-toolbar>
      <v-data-table
          :headers="[]"
          :items="[]"
          :loading="false"
          disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2"
          >mdi-pencil</v-icon
          >
          <v-icon medium color="red"
          >mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Students",

  computed: {
    ...mapState("coreModule", ["drawer"])
  },
}
</script>

<style scoped>

</style>