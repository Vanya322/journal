<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col sm="6" md="4">
        <v-card elevation="2" :loading="authInProgress">
          <v-card-title>
            Регистрация
          </v-card-title>
          <v-card-text>
            <v-text-field
                :disabled="authInProgress"
                label="Имя"
                v-model="userData.name"
            ></v-text-field>
            <v-text-field
                :disabled="authInProgress"
                label="Почта"
                :rules="[emailRule]"
                v-model="userData.email"
            ></v-text-field>
            <v-text-field
                type="password"
                :disabled="authInProgress"
                label="Пароль"
                v-model="userData.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <router-link to="/login" class="no-link-style">
              <v-btn :disabled="authInProgress">
                Вход
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onRegisterClick"
              :disabled="disableBtn"
            >
              Регистрация
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {EMAIL_REGEX, IS_MOBILE, USER_TYPE_MEMBER} from "../utils/utils";
import {mapState} from "vuex";

export default {
  name: "Register",

  data: () => ({
    userData: {
      name: "",
      email: "",
      password: "",
      type: USER_TYPE_MEMBER.value
    },
  }),

  computed: {
    ...mapState("coreModule", ["drawer"]),
    ...mapState("userModule", [
        "user",
        "authInProgress"
      ]),

    emailRule() {
      return !this.userData.email
          || EMAIL_REGEX.test(this.userData.email)
          || "Не валидная почта!";
    },

    disableBtn() {
      return this.authInProgress
          || !this.emailRule
          || !this.userData.password
    }
  },

  methods: {
    onRegisterClick() {
      this.$store.dispatch("userModule/signUp", this.userData);
    }
  },

  mounted() {
    if (!this.user && this.drawer) {
      this.$store.commit("coreModule/toggleDrawer");
    }
  }
}
</script>
<style lang="scss">
.login-theme-btn {
  margin-top: 7px;
  margin-right: 7px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
