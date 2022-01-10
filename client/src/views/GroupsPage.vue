<template>
  <Groups />
</template>

<script>
export default {
  name: "GroupsPage",

  routing: {
    routeName: "Группы",
    icon: "mdi-view-dashboard",
    path: "/groups",
    hasAccess: (user) => user.isAdmin || user.isMember,
  },

  components: {
    Groups: () => import("../components/groups/Groups")
  }
}
</script>

<style scoped>

</style>