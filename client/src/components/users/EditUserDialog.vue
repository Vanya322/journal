<template>
  <v-dialog v-model="open" width="500px">
    <v-card class="edit-student-dialog" :loading="loading">
      <v-card-title>
        {{
          targetUser.id
            ? "Редактирование"
            : "Создание"
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="ФИО"
          :disabled="loading"
          v-model="targetUser.name"
        ></v-text-field>
        <v-text-field
          label="Почта"
          :disabled="loading"
          :rules="[emailRule]"
          v-model="targetUser.email"
        ></v-text-field>
        <v-text-field
            v-if="targetUser.id"
            label="Старый пароль"
            :disabled="loading"
            type="password"
            v-model="oldPassword"
        ></v-text-field>
        <v-text-field
          label="Пароль"
          :disabled="loading"
          type="password"
          :rules="[passwordRule]"
          v-model="targetUser.password"
        ></v-text-field>
        <v-text-field
          label="Повторить пароль"
          :disabled="loading"
          type="password"
          :rules="[passwordCopyRule]"
          v-model="passwordCopy"
        ></v-text-field>
        <v-select
          label="Тип"
          :items="userTypes"
          v-model="targetUser.type"
          :disabled="loading"
          item-text="text"
          item-value="value"
          return-object
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="open = false"
          :disabled="loading"
        >Отменить</v-btn>
        <v-btn
          text
          color="primary"
          :disabled="disableSave || loading"
          @click="save()"
        >
          {{
            targetUser.id
              ? "Изменить"
              : "Создать"
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {User} from "../../models/User";
import {EMAIL_REGEX, USER_TYPE_MEMBER, USER_TYPES} from "../../utils/utils";
import {mapState} from "vuex";

export default {
  name: "EditUserDialog",

  data: () => ({
    open: false,
    dateMenu: false,

    targetUser: {},
    disableGroup: false,
    loading: false,
    passwordCopy: "",
    oldPassword: "",
  }),

  computed: {
    ...mapState("userModule", ["user"]),

    userTypes() {
      return Object.values(USER_TYPES)
    },

    passwordRule() {
      return !!this.oldPassword && !!this.targetUser.password
        || "Введите старый пароль!";
    },

    passwordCopyRule() {
      return this.targetUser.password === this.passwordCopy
        || "Пароли не совпадают!";
    },

    emailRule() {
      return EMAIL_REGEX.test(this.targetUser.email)
          || "Не валидная почта!";
    },

    disableSave() {
      if(this.targetUser.id) {
        return !this.targetUser.name
          || !this.targetUser.email
          || (!!this.oldPassword && !this.targetUser.password)
          || (!this.oldPassword && !!this.targetUser.password)
      }
      return !this.targetUser.name
        || !this.targetUser.email
        || !this.targetUser.password
    }
  },

  methods: {
    openDialog(targetUser) {
      this.passwordCopy = "";
      this.oldPassword = "";
      this.targetUser = new User(undefined, "", "", USER_TYPE_MEMBER);
      this.targetUser = Object.assign(this.targetUser, targetUser);
      this.open = true;
    },

    async save() {
      this.loading = true;
      await this.$store.dispatch("usersModule/addOrSaveUser", {user: this.targetUser, oldPassword: this.oldPassword})
      await this.$emit("onUpdate")
      if(this.targetUser.id === this.user.id) {
        await this.$store.dispatch("userModule/checkTokenAndSignIn")
      }
      this.loading = false;
      this.open = false;
    }
  }
}
</script>
