<template>
  <v-dialog v-model="open" width="500px">
    <v-card class="edit-group-dialog" :loading="loading">
      <v-card-title>
        {{
          group.id
            ? "Редактирование"
            : "Создание"
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Название"
          :disabled="loading"
          v-model="group.name"
          :rules="[groupNameRule]"
        ></v-text-field>
        <v-menu
          v-model="dateStartMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="group.dateStart"
              label="Начало обучения"
              :disabled="loading"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="group.dateStart"
            no-title
          ></v-date-picker>
        </v-menu>
        <v-menu
            v-model="dateEndMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="group.dateEnd"
                label="Конец обучения"
                :disabled="loading"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="group.dateEnd"
              no-title
          ></v-date-picker>
        </v-menu>
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
            group.id
              ? "Изменить"
              : "Создать"
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";
import {Group} from "../../models/Group";

export default {
  name: "EditGroupDialog",

  data: () => ({
    open: false,

    group: {},
    dateStartMenu: false,
    dateEndMenu: false,
    loading: false,
  }),

  computed: {
    ...mapState("groupsModule", ["groups"]),

    groupNameRule() {
      return !this.group.id
        ? !this.groups.some((it) => it.name === this.group.name)
            || "Такое имя уже существует!"
        : true;
    },

    disableSave() {
      return !this.group.name
        || !this.group.dateStart
        || !this.group.dateEnd
        || !this.groupNameRule
    }
  },

  methods: {
    openDialog(group) {
      this.group = new Group();
      this.group = Object.assign(this.group, group);
      this.open = true;
    },

    async save() {
      this.loading = true;
      await this.$store.dispatch("groupsModule/addOrSaveGroup", this.group)
      await this.$emit("onUpdate")
      this.loading = false;
      this.open = false;
    }
  }
}
</script>
