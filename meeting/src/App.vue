<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',

    mounted(){
      if (this._isMobile()) {
        // 手机端
        this.$router.replace("/mobilehome");
      } else {
        // pc端
        this.$router.replace("/home");
      }
    },

    methods:{
      _isMobile() {
        return navigator.userAgent.match(
                /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
        );
      }
    }
  }

</script>

<style scoped>
</style>
