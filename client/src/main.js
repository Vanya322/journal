import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import router from './router'
import Toasted from "vue-toasted";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.use(Toasted);

const storeModulesContext = require.context("@/store", true, /\.store\.(js|ts)$/);

const store = new Vuex.Store({
  modules: Object.fromEntries(
      storeModulesContext.keys()
          .map((x) => storeModulesContext(x).default)
          .map((component) => [component._vmdModuleName || component.name, component]),
  ),
});

const vueFilesContext = require.context("@/views", true, /.vue$/);
const viewPages = vueFilesContext.keys()
    .map((x) => (vueFilesContext(x).default))
    .filter((component) => component.routing)
    .map((component) => ({
      name: component.name,
      routing: component.routing,
    }));

store.commit("pagesModule/setViewPages", viewPages);

const Application = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


export { Application, store };

Object.defineProperty(Array.prototype, "mapNotNull", {
    enumerable: false,
    configurable: false,
    writable: false,
    value(transformer) {
        return this.map(transformer).filter((it) => it);
    },
});