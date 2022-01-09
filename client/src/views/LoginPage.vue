<template>
  <Login />
</template>

<script>
// @ is an alias to /src
import Login from "../components/Login.vue";

export default {
  name: "LoginPage",

  routing: {
    path: "/login",
    hasAccess: () => false,
  },

  components: {
    Login,
  },
};
</script>
