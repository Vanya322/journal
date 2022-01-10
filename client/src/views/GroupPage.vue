<template>
  <Group />
</template>

<script>
export default {
  name: "GroupsPageId",

  routing: {
    path: "/groups/:id",
    hasAccess: (user) => user.isAdmin || user.isMember,
  },

  components: {
    Group: () => import("../components/group/Group")
  }
}
</script>

<style scoped>

</style>