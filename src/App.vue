<template>
    <div id="app">
        <h1 :class="$style.hhh">
            {{ msg }} <span>hello</span>
        </h1>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
      data() {
        return {
            msg: "Welcome to Your Vue.js App!",
        }
    },
}
</script>

<style lang="scss" module>
@import "./assets/css/reset.scss";
.hhh {
    color: #ddd;
    font-size: 100px;
    span {
        color: #fff;
    }
}
</style>
