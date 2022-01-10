<template>
  <Students />
</template>

<script>
export default {
  name: "StudentsPage",

  routing: {
    routeName: "Студенты",
    icon: "mdi-account-group",
    path: "/students",
    hasAccess: (user) => user.isAdmin,
  },

  components: {
    Students: () => import("../components/students/Students")
  }
}
</script>

<style scoped>

</style>