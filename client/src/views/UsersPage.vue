<template>
  <Users />
</template>

<script>
export default {
  name: "UsersPage",

  routing: {
    routeName: "Пользователи",
    icon: "mdi-account-tie",
    path: "/users",
    hasAccess: (user) => user.isAdmin,
  },

  components: {
    Users: () => import("../components/users/Users")
  }
}
</script>

<style scoped>

</style>