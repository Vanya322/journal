<template>
  <div class="academic-performance">
    <div
      v-if="mode === VIEW_MODE"
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
      if(this.mode === LOADING_MODE && !this.academicPerformance.performance) {
        return;
      }
      if(this.academicPerformance.id && this.academicPerformance.performance) {
        this.mode = VIEW_MODE;
      } else {
        this.mode = EDIT_MODE;
      }
    }
  },

  data: () => ({
    VIEW_MODE,
    EDIT_MODE,
    LOADING_MODE,

    mode: undefined,
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
    if(this.academicPerformance.id && this.academicPerformance.performance) {
      this.mode = VIEW_MODE;
    } else {
      this.mode = EDIT_MODE;
    }
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
  }
}
</style>