<template>
  <v-card width="256px" v-if="user" :style="styles" class="rounded-0 drawer-card" >
    <v-navigation-drawer permanent fill-height>
      <v-list dense nav class="drawer-list">
        <router-link
          v-for="item in navigationList"
          :key="item.routeName"
          :to="item.path"
          :active-class="checkItemOnActive(item) ? 'active-menu-item' : ''"
        >
          <v-list-item
            link
            @click="onMenuClick"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                item.routeName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="onLogoutClick" :disabled="authInProgress">
            Выход
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import GroupsPage from "../views/GroupsPage";
import StudentsPage from "../views/StudentsPage";
import SciencesPage from "../views/SciencesPage";

export default {
  name: "NavigationDrawer",


  data() {
    return {
      drawer: true,
    };
  },

  computed: {
    ...mapState("userModule", ["authInProgress", "user"]),

    styles() {
      const { bar, top } = this.$vuetify.application;

      return {
        height: `calc(100vh - ${top + bar}px) !important`,
      };
    },

    navigationList() {
      if (!this.user) return [];
      return [
        GroupsPage,
        StudentsPage,
        SciencesPage,
      ].map((it) => it.routing)
        .filter((it) => it.hasAccess(this.user));
    },
  },

  methods: {
    checkItemOnActive(item) {
      return this.$route.path === "/"
          || (
              this.$route.path.startsWith(item.path)
              && item.path !== "/"
          );
    },

    onMenuClick() {
      this.$store.commit("coreModule/drawerLinkClicked");
    },

    onLogoutClick() {
      this.$store.dispatch("userModule/signOut");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

<style lang="scss">
@import '"~vuetify/src/styles/styles.sass';
.drawer-list {
  .v-treeview-node__content {
    margin-left: 3px !important;
  }
  .active-menu-item {
    .v-list-item {
      background-color: map-get($grey, "lighten-1") !important;
    }
  }
  .not-active-item {
    opacity: 0.5;
  }
  .disabled-item {
    position: relative;
    left: -24px;
    opacity: 0.5;
    .v-list-item__content {
      margin-left: 2px;
    }
    .v-list-item__icon {
      margin-right: 10px !important;
    }
  }
  .v-expansion-panel-content__wrap {
    padding: 0;
  }
  .v-treeview-node__label {
    overflow: visible;
  }
  .v-treeview-node__level {
    width: 12px !important;
  }
  .v-list-item__icon {
    margin-right: 11px !important;
  }
  .v-expansion-panels {
    .v-expansion-panel {
      background-color: map-get(
        $material-dark-elevation-colors,
        "12"
      ) !important;
    }
    .v-expansion-panel--active {
      margin-top: 0;
    }
    .v-expansion-panel--active + .v-expansion-panel {
      margin-top: 0;
    }
  }
}

.light-local-user-theme {
  .drawer-list {
    .active-menu-item {
      .v-list-item {
        background-color: map-get($grey, "lighten-2") !important;
      }
    }
  }
}
</style>
