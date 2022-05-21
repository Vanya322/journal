<template>
  <v-container :class="drawer ? 'drawer-open' : 'drawer-closed'">
    <v-card :loading="currentLoading">
      <v-toolbar flat>
        <v-toolbar-title>
          Группы
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="search-field mr-2"
          label="Поиск"
          v-model="searchString"
          clerable
        ></v-text-field>
        <v-btn color="primary" @click="openEditDialog({})" v-if="user.isAdmin">
          Добавить группу
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <div class="d-flex flex-wrap">
          <v-card
            v-for="group in displayGroups"
            :key="group.id"
            class="ma-1 cursor"
            @click="$router.push(`/groups/${group.id}`)"
          >
            <v-card-title>
              {{group.name}}
              <v-spacer></v-spacer>
              <v-btn
                v-if="user.isAdmin"
                icon
                small
                @click.stop="openEditDialog(group)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-if="user.isAdmin"
                icon
                small
                color="red"
                @click.stop="openDeleteDialog(group)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              <p class="ma-0">Начало обучения: {{group.dateStart}}</p>
              <p class="ma-0">Конец обучения: {{group.dateEnd}}</p>
            </v-card-subtitle>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
    <ConfirmationDialog ref="confirmationDialog" />
    <EditGroupDialog ref="editGroupDialog" @onUpdate="loadPage"/>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import moment from "moment";

export default {
  name: "Groups",

  components: {
    ConfirmationDialog: () => import("../ConfirmationDialog"),
    EditGroupDialog: () => import("./EditGroupDialog"),
  },

  data: () => ({
    searchString: "",
  }),

  computed: {
    ...mapState("userModule", ["user"]),
    ...mapState("coreModule", ["drawer"]),
    ...mapState("groupsModule", [
      "groups",
      "currentLoading",
    ]),

    displayGroups() {
      const str = this.searchString.trim().toLowerCase();
      return str ? this.groups.filter((group) => (
          group.name.toLowerCase().includes(str)
          || group.dateStart.toLowerCase().includes(str)
          || group.dateEnd.toLowerCase().includes(str)
        ))
        : this.groups
    }
  },

  methods: {
    loadPage(){
      this.$store.dispatch("groupsModule/loadPage")
    },

    openEditDialog(group) {
      this.$refs.editGroupDialog.openDialog(group)
    },

    openDeleteDialog(group) {
      this.$refs.confirmationDialog.openDialog({
        header: "Удаление",
        text: `Вы уверены, что хотите удалить ${group.name}?`,
        cancelText: "Отменить",
        submitText: `Удалить`,
        submitColor: "red",
        onSubmit: async () => {
          await this.$store.dispatch("groupsModule/deleteGroup", group)
        },
      });
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
