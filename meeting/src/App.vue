<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    // created(){
    //   if(this.$router.path !== '/Home'){
    //     this.$router.replace('/Home')
    //   }
    // }
    mounted(){
      if (this._isMobile()) {
        // 手机端
        this.$router.replace("/MobileHome");
      } else {
        // pc端
        this.$router.replace("/");
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
