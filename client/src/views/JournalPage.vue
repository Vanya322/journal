<template>
  <Journal />
</template>

<script>
export default {
  name: "JournalPage",

  routing: {
    path: "/journals",
    hasAccess: (user) => user.isAdmin || user.isMember,
  },

  components: {
    Journal: () => import("../components/journal/Journal")
  }
}
</script>

<style scoped>

</style>