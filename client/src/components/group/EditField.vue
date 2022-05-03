<template>
  <div class="academic-performance">
    <div
      v-show="mode === VIEW_MODE"
      class="performance"
      @click="mode = EDIT_MODE"
    >
      {{academicPerformance.performance}}
    </div>
    <div v-if="mode === EDIT_MODE" class="d-flex">
      <v-text-field
        class="field-width"
        :value="academicPerformance.performance"
        @input="newPerformance = $event"
      ></v-text-field>
      <v-icon
        small
        class="mr-2"
        @click="apply"
        color="green"
        :disabled="newPerformance === academicPerformance.performance"
      >mdi-check</v-icon>
      <v-icon
        small
        color="red"
        @click="cancel"
      >mdi-close</v-icon>
    </div>
    <div v-if="mode === LOADING_MODE">
      <v-progress-circular
        color="primary"
        :size="20"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
const VIEW_MODE = "VIEW MODE"
const EDIT_MODE = "EDIT MODE"
const LOADING_MODE = "LOADING MODE"

export default {
  name: "EditField",

  props: {
    academicPerformance: Object,
    groupId: String,
    sciencePerformanceId: String,
  },

  watch: {
    academicPerformance() {
      this.mode = VIEW_MODE;
    }
  },

  data: () => ({
    VIEW_MODE,
    EDIT_MODE,
    LOADING_MODE,

    mode: VIEW_MODE,
    newPerformance: undefined,
  }),

  methods: {
    async apply(){
      this.mode = LOADING_MODE;
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
    },

    cancel() {
      this.newPerformance = undefined;
      this.mode = VIEW_MODE;
    }
  },

  mounted() {
    this.mode = VIEW_MODE;
  }
}
</script>

<style lang="scss">
.academic-performance {
  .field-width {
    input {
      width: 10px !important;
    }
  }
  .performance {
    font-size: 20px;
    min-height: 30px;
    min-width: 30px;
  }
}
</style>
