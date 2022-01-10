<template>
  <v-dialog v-model="open" width="500px">
    <v-card class="edit-science-dialog" :loading="loading">
      <v-card-title>
        {{
          science.id
            ? "Редактирование"
            : "Создание"
        }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Название"
          v-model="science.name"
          :disabled="loading"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text :disabled="loading" @click="open = false">Отменить</v-btn>
        <v-btn text color="primary" :disabled="disableSave || loading" @click="save()">
          {{
            science.id
              ? "Изменить"
              : "Создать"
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditScienceDialog",

  data: () => ({
    open: false,
    dateMenu: false,

    science: {},
    loading: false,
  }),

  computed: {
    disableSave() {
      return !this.science.name
    }
  },

  methods: {
    openDialog(science) {
      this.science = {...science};
      this.open = true;
    },

    async save() {
      this.loading = true;
      await this.$store.dispatch("sciencesModule/addOrSaveScience", this.science)
      this.loading = false;
      this.open = false;
    }
  }
}
</script>
