<template>
  <v-dialog v-model="open" width="500px">
    <v-card class="edit-student-dialog" :loading="loading">
      <v-card-title>
        {{
          user.id
            ? "Редактирование"
            : "Создание"
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="ФИО"
          :disabled="loading"
          v-model="user.name"
        ></v-text-field>
        <v-text-field
          label="Почта"
          :disabled="loading"
          :rules="[emailRule]"
          v-model="user.email"
        ></v-text-field>
        <v-text-field
            v-if="user.id"
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
          v-model="user.password"
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
          v-model="user.type"
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
            user.id
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

export default {
  name: "EditUserDialog",

  data: () => ({
    open: false,
    dateMenu: false,

    user: {},
    disableGroup: false,
    loading: false,
    passwordCopy: "",
    oldPassword: "",
  }),

  computed: {
    userTypes() {
      return Object.values(USER_TYPES)
    },

    passwordRule() {
      return !!this.oldPassword && !!this.user.password
        || "Введите старый пароль!";
    },

    passwordCopyRule() {
      return this.user.password === this.passwordCopy
        || "Пароли не совпадают!";
    },

    emailRule() {
      return EMAIL_REGEX.test(this.user.email)
          || "Не валидная почта!";
    },

    disableSave() {
      if(this.user.id) {
        return !this.user.name
          || !this.user.email
          || (!!this.oldPassword && !this.user.password)
          || (!this.oldPassword && !!this.user.password)
      }
      return !this.user.name
        || !this.user.email
        || !this.user.password
    }
  },

  methods: {
    openDialog(user) {
      this.passwordCopy = "";
      this.oldPassword = "";
      this.user = new User(undefined, "", "", USER_TYPE_MEMBER);
      this.user = Object.assign(this.user, user);
      this.open = true;
    },

    async save() {
      this.loading = true;
      await this.$store.dispatch("usersModule/addOrSaveUser", {user: this.user, oldPassword: this.oldPassword})
      await this.$emit("onUpdate")
      this.loading = false;
      this.open = false;
    }
  }
}
</script>
