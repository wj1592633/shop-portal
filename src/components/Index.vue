<template>
  <div class="container">
    <!--首页上面，用户头像行-->
    <div class="user-info">
      <div class="user-name btn-show" @click="showOrders">查看订单</div>
      <div class="user-img">
        <img src="../../public/0.jpg">
        <div class="user-name" v-if="!isLogin" @click="redirectLogin">请登录</div>
        <div class="user-name" v-else >{{userInfo.nickname}}</div>
        <div class="user-name btn-show" @click="showAmount">查看余额</div>
      </div>
    </div>
    <div class="rt-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import http from '@/assets/js/public'
var sysConfig = require('@/assets/js/sysConfig')
export default {
  data() {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  methods: {
    showAmount(){
      http.requestGet(sysConfig.urlPreUser + '/user/amount').then((data) => {
        if (data.state === 200){
          this.$message({
            message: data.data,
            type: 'success',
            showClose: true
          });
        } else {
          this.$message({
            message: '余额:' + data.data,
            type: 'warning',
            showClose: true
          });
        }
      }, () => {
        this.$message({
          message: '网络繁忙，稍后再试',
          type: 'warning',
          showClose: true
        });
      })
    },
    redirectLogin(){
      this.$router.push({ path: '/login' })
    },
    showOrders(){
      this.$router.push({ path: '/index/order' })
    }
  },
  created(){
    const userInfoStr = sessionStorage.getItem(sysConfig.userInfo)
    if (userInfoStr != null) {
      var userInfo = JSON.parse(userInfoStr)
      this.userInfo = userInfo
      this.isLogin = true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
  .user-info {
    overflow: hidden;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 75px;
    border: 1px solid #000;
  }

  .user-img,.user-name {
    float: right;
    padding-right: 20px;
    text-align: center;
    line-height: 75px;
  }
  .user-name {
    margin-left: 10px;
  }
  img {
    border-radius: 50%;
    width: 75px;
  }
  .rt-view {
    margin-top: 75px;
  }
  .btn-show {
    background-color: aqua;
    border-radius: 10px;
  }
  .user-name:hover {
    cursor: pointer;
  }
</style>
