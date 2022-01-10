<template>
  <v-dialog v-model="open" width="500px">
    <v-card>
      <v-card-title>
        Добавление
      </v-card-title>
      <v-card-text>
        <v-autocomplete
            v-model="selectedScience"
            label="Группа"
            :items="sciences"
            return-object
            item-text="name"
            item-value="id"
        >
          <template v-slot:selection="{item}">
            {{item.name}}
          </template>
          <template v-slot:item="{item}">
            {{item.name}}
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="open = false">Отменить</v-btn>
        <v-btn text color="primary" :disabled="disableSave" @click="save()">
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AddScienceDialog",

  props: {
    group: Object,
  },

  data: () => ({
    open: false,
    dateMenu: false,

    selectedScience: null,
  }),

  computed: {
    ...mapState("sciencesModule", ["sciences"]),

    disableSave() {
      return !this.selectedScience
    }
  },

  methods: {
    openDialog() {
      this.open = true;
    },

    async save() {
      await this.$store.dispatch("sciencePerformancesModule/addScience", {
        science: this.selectedScience,
        group: this.group,
      })
      this.$emit("onUpdate");
      this.open = false;
    }
  }
}
</script>
