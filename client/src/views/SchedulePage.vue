<template>
  <Schedule />
</template>

<script>
export default {
  name: "SchedulePage",

  routing: {
    routeName: "Расписание",
    icon: "mdi-timetable",
    path: "/schedule",
    hasAccess: (user) => user,
  },

  components: {
    Schedule: () => import("../components/Schedule")
  }
}
</script>

<style scoped>

</style>
