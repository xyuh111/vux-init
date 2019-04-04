import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import FastClick from "fastclick"

FastClick.attach(document.body)
Vue.config.productionTip = false // 这不是生产环境

new Vue({
    el: "#app",
    router,
    render: h => h(App),
}).$mount("#app")
