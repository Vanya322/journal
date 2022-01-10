<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col sm="6" md="4">
        <v-card elevation="2" :loading="authInProgress">
          <v-card-title>
            Вход
          </v-card-title>
          <v-card-text>
            <v-text-field
              :disabled="authInProgress"
              :rules="[emailRule]"
              label="Почта"
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
<!--            <router-link to="/register" class="no-link-style">-->
<!--              <v-btn :disabled="authInProgress">-->
<!--                Регистрация-->
<!--              </v-btn>-->
<!--            </router-link>-->
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onLoginClick"
              :disabled="disableBtn"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { EMAIL_REGEX } from "../utils/utils";
import {mapState} from "vuex";

export default {
  name: "Login",

  data: () => ({
    userData: {
      email: "",
      password: "",
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
    onLoginClick() {
      this.$store.dispatch("userModule/signIn", this.userData);
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
