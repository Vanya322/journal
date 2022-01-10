<template>
  <Sciences />
</template>

<script>
export default {
  name: "SciencesPage",

  routing: {
    routeName: "Предметы",
    icon: "mdi-book-multiple",
    path: "/sciences",
    hasAccess: (user) => user.isAdmin,
  },

  components: {
    Sciences: () => import("../components/sciences/Sciences")
  }
}
</script>

<style scoped>

</style>