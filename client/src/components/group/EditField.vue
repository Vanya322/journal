<template>
  <div>
    <div v-if="mode === VIEW_STATE" @click="mode = EDIT_STATE">
      {{academicPerformance.performance}}
    </div>
    <div v-if="mode === EDIT_STATE" class="d-flex">
      <v-text-field
        class="field-width"
        :value="academicPerformance.performance"
        @input="newPerformance = $event"
      ></v-text-field>
      <v-icon
        medium
        class="mr-2"
        @click="apply()"
        color="green"
        :disabled="!newPerformance"
      >mdi-check</v-icon>
      <v-icon
        v-if="academicPerformance.id && academicPerformance.performance"
        medium
        color="red"
        @click="cancel()"
      >mdi-close</v-icon>
    </div>
  </div>
</template>

<script>
const VIEW_STATE = "VIEW STATE"
const EDIT_STATE = "EDIT STATE"

export default {
  name: "EditField",

  props: {
    academicPerformance: Object,
    groupId: String,
    sciencePerformanceId: String,
  },

  watch: {
    academicPerformance() {
      if(this.academicPerformance.id && this.academicPerformance.performance) {
        this.mode = VIEW_STATE;
      } else {
        this.mode = EDIT_STATE;
      }
    }
  },

  data: () => ({
    VIEW_STATE,
    EDIT_STATE,

    mode: undefined,
    newPerformance: undefined,
  }),

  methods: {
    async apply(){
       await this.$store.dispatch(
          "academicPerformancesModule/addOrSave",
          {
            academicPerformance: {
              ...this.academicPerformance,
              performance: this.newPerformance,
            },
            groupId: this.groupId,
            sciencePerformanceId: this.sciencePerformanceId,
          }
      )
      await this.$emit("onUpdate");
      this.mode = VIEW_STATE;
    },

    cancel() {
      this.newPerformance = undefined;
      this.mode = VIEW_STATE;
    }
  },

  mounted() {
    if(this.academicPerformance.id && this.academicPerformance.performance) {
      this.mode = VIEW_STATE;
    } else {
      this.mode = EDIT_STATE;
    }
  }
}
</script>

<style lang="scss">
.field-width {
  input {
    width: 10px !important;
  }
}
</style>