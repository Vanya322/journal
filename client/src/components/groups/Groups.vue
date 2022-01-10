<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card :loading="currentLoading">
      <v-toolbar flat>
        <v-toolbar-title>
          Группы
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openEditDialog({})">
          Добавить группу
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <div class="d-flex">
          <v-card v-for="group in groups" :key="group.id" class="ma-1 cursor">
            <router-link :to="`/groups/${group.id}`" class="no-link-style">
              <v-card-title>
                {{group.name}}
              </v-card-title>
              <v-card-subtitle>
                <p class="ma-0">Начало обучения: {{group.dateStart}}</p>
                <p class="ma-0">Конец обучения: {{group.dateEnd}}</p>
              </v-card-subtitle>
            </router-link>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
    <EditGroupDialog ref="editGroupDialog" @onUpdate="loadPage"/>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Groups",

  components: {
    EditGroupDialog: () => import("./EditGroupDialog"),
  },

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("groupsModule", [
      "groups",
      "currentLoading",
    ])
  },

  methods: {
    loadPage(){
      this.$store.dispatch("groupsModule/loadPage")
    },

    openEditDialog(group) {
      this.$refs.editGroupDialog.openDialog(group)
    }
  },

  mounted() {
    this.loadPage();
  }
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>