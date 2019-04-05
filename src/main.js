import Vue from "vue"
import App from "./App.vue"
import Vuex from "vuex"
import router from "./router"
import vuexI18n from "vuex-i18n"
import FastClick from "fastclick"
///////////////   引入vuex 是为了解决  $t is not defined  报错
Vue.use(Vuex)

const store = new Vuex.Store({
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        increment() {
            this.count++
        },
    },
})

Vue.use(vuexI18n.plugin, store)
//////////////////
FastClick.attach(document.body)
Vue.config.productionTip = false // 这不是生产环境

new Vue({
    store,
    el: "#app",
    router,
    render: h => h(App),
}).$mount("#app")
