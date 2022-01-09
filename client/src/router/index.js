import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from "../main";

Vue.use(VueRouter);

const pagesContext = require.context("@/views", true, /.vue$/);
const pages = pagesContext.keys()
    .map((x) => (pagesContext(x).default))
    .filter((it) => it.routing)
    .map((it) => ({
      name: it.name,
      path: it.routing.path,
      component: it,
    }));

const routes = [
  ...pages,
]

const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach(async (to, from, next) => {
    if (!store.state.userModule.user) {
       await store.dispatch("userModule/checkTokenAndSignIn");
    }
    if (store.state.userModule.user) {
        store.state.userModule.user.applyRedirectRules(to, from, next);
    } else if (to.name !== "LoginPage") {
        if (to.name === "RegisterPage") {
            next();
        } else {
            next({ name: "LoginPage" });
        }
    } else {
        next();
    }
});

export default router;
