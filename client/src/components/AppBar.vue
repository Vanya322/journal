<template>
  <v-app-bar fixed app v-if="user" class="dsps-app-bar" color="primary">
    <v-app-bar-nav-icon @click.stop="onBurgerClick" class="white--text"></v-app-bar-nav-icon>
    <v-toolbar-title :class="{ 'pa-0': IS_MOBILE }">
      <router-link class="white--text" to="/">
        НИУ РАНХиГС
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <v-list-item class="pl-1 text-right">
        <v-list-item-content>
          <v-list-item-title class="white--text">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            {{ user.type.text }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-avatar color="secondary" class="white--text" size="42">{{
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
