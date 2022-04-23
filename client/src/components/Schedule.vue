<template>
  <div>
    {{schedules}}
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Schedule",

  computed: {
    ...mapState("schedulesModule", ["schedules"])
  },

  mounted() {
    this.$store.dispatch("schedulesModule/loadSchedule", {
      user: "Иб-341",
      start: "23.01.2022",
      end: "30.06.2022",
    })
  }
}
</script>

<style scoped>

</style>
