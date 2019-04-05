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
<style lang="less">
@import "~vux/src/styles/reset.less";
body{
	font-size: 10px;
}
</style>

<style lang="scss" module>
@import "./assets/css/reset.scss";
.hhh {
    font-size: 20px;
	color:#666;
    span {
        color: #fff;
    }
}
</style>
