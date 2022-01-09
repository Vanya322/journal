<template>
  <Register />
</template>

<script>
export default {
  name: "RegisterPage",

  routing: {
    path: "/register",
    hasAccess: () => false,
  },

  components: {
    Register: () => import("../components/Register"),
  },
}
</script>

<style scoped>

</style>