<template>
  <v-app id="app">
    <AppBar class="app-bar" v-show="!showSpinner"></AppBar>
    <v-main>
      <v-container fill-height fluid pa-0 class="align-stretch no-scroll">
        <v-row class="no-gutters fixed-row">
          <v-col
              class="drawer-col"
              :style="styles"
              v-show="drawer && user && !showSpinner"
          >
            <NavigationDrawer></NavigationDrawer>
          </v-col>
          <v-col v-if="showSpinner">
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <v-col sm="2" class="text-center">
                  <v-progress-circular
                      :size="70"
                      color="primary"
                      indeterminate
                  ></v-progress-circular>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col :class="{ 'content-col': drawer }" v-if="!showSpinner">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import router from "@/router";

export default {
  computed: {
    ...mapState("userModule", ["authInProgress", "user"]),
    ...mapState("coreModule", ["drawer"]),

    showSpinner(){
      return (this.authInProgress && !this.user)
    },

    styles() {
      const { bar, top } = this.$vuetify.application;

      return {
        maxHeight: `calc(100vh - ${top + bar}px) !important`,
        top: `${top + bar}px !important`,
      };
    },
  },
  components: {
    AppBar,
    NavigationDrawer,
  },
};
</script>

<style lang="scss">
@import "~vuetify/src/components/VStepper/_variables.scss";
.search-field {
  max-width: 250px;
  .v-text-field__details {
    display: none !important;
  }
}
.no-link-style {
  text-decoration: none !important;
  color: black !important;
}
.drawer-open {
  max-width: calc(100vw - 256px - 12px) !important; /*.container{padding: 12px;}*/
}
.drawer-closed {
  max-width: calc(100vw - 12px) !important; /*.container{padding: 12px;}*/
}
.w-100 {
  width: 100% !important;
}
.h-100 {
  height: 100% !important;
}
.w-110 {
  width: 110% !important;
}
.background-none {
  background: none !important;
}
.d-none {
  display: none !important;
}
.app-bar {
  z-index: 10 !important;
}
.no-scroll {
  overflow-x: hidden;
}
.fs-12px {
  font-size: 12px !important;
}
.d-none {
  display: none !important;
}
.cursor-pointer {
  cursor: pointer !important;
}
.drawer-col {
  position: -webkit-sticky !important;
  position: fixed !important;
  max-width: 256px;
  z-index: 9 !important;
}
.content-col {
  margin-left: 256px;
}
.toasted {
  font-family: $body-font-family;
}

.fixed-row {
  flex-wrap: initial !important;
}

::-webkit-scrollbar-track {
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: var(--v-primary-base);
}

.textfield-without-border {
  .v-input__slot::before {
    border: none !important;
  }
}
//Infractions

.new-infraction-table-item {
  background-color: rgba(255, 0, 0, 0.1);
}
.coaching-assigned-infraction-table-item {
  background-color: rgba(33, 150, 243, 0.1);
}
.resolved-infraction-table-item {
  background-color: rgba(76, 175, 80, 0.1);
}
.v-tooltip__content {
  z-index: 999999 !important;
}
//Vuetify fixes
.no-elastic-chip {
  min-width: min-content;

  .v-chip__content {
    min-width: min-content;
  }
}
.theme-text-color {
  color: var(--v-themeTextColor-base) !important;
}
.theme-border-color {
  border-color: var(--v-themeTextColor-base) !important;
}
.v-data-table {
  &.not-default-page-size {
    .v-data-footer__select {
      .v-select__selection.v-select__selection--comma {
        color:orange !important;
      }
    }
  }
  th {
    .not-default-header-sort ~ i {
      color: orange !important;
    }
  }
}

.v-input--selection-controls__input {
  color: inherit;
  display: inline-flex;
  flex: 0 0 auto;
  height: 24px;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition-property: transform;
  width: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.v-input--selection-controls__ripple {
  border-radius: 50%;
  cursor: pointer;
  height: 34px;
  position: absolute;
  transition: inherit;
  width: 34px;
  left: -12px;
  top: calc(50% - 24px);
  margin: 7px;
}

.v-input--selection-controls__ripple:before {
  border-radius: inherit;
  bottom: 0;
  content: "";
  position: absolute;
  opacity: .2;
  left: 0;
  right: 0;
  top: 0;
  transform-origin: center center;
  transform: scale(.2);
  transition: inherit;
}

.v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before {
  background: currentColor;
  transform: scale(1.2);
  transition: none;
}

.v-input--selection-controls__input .v-icon {
  width: 100%;
}

.v-input--selection-controls__ripple > .v-ripple__container {
  transform: scale(1.2);
}
</style>
