<template>
  <v-app-bar fixed app v-if="user" class="dsps-app-bar">
    <v-app-bar-nav-icon @click.stop="onBurgerClick"></v-app-bar-nav-icon>
    <v-toolbar-title :class="{ 'pa-0': IS_MOBILE }">
      <router-link class="theme-text-color" to="/">
        НИУ РАНХиГС
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <v-list-item class="pl-1 text-right">
        <v-list-item-content>
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.type.text }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-avatar color="primary" class="white--text" size="42">{{
      user.abbreviation
    }}</v-avatar>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { IS_MOBILE } from "../utils/utils";

export default {
  name: "AppBar",

  computed: {
    ...mapState("userModule", ["authInProgress", "user"]),
  },

  data: () => ({
    IS_MOBILE,
  }),

  methods: {
    onBurgerClick() {
      this.$store.commit("coreModule/toggleDrawer");
    },
  },
};
</script>

<style lang="scss">
.dsps-app-bar {
  .v-list-item__content {
    width: min-content !important;
  }
  .router-link-active {
    text-decoration: none;
    color: var(--v-primary-base);
  }
}
</style>
