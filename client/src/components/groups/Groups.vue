<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          Группы
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary">
          Добавить группу
        </v-btn>
      </v-toolbar>

    </v-card>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Groups",

  computed: {
    ...mapState("coreModule", ["drawer"])
  },
}
</script>

<style scoped>

</style>