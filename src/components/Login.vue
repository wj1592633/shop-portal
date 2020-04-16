<template>
  <div class="login">
    <div class="login_box">
      <div class="login_img">
        <img src="../../public/0.jpg">
      </div>

      <div class="login_form">
        <el-form>
          <!--<el-form-item label="账号">-->
          <el-form-item>
            <el-input v-model="username" placeHolder="账号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="password" show-password placeHolder="密码"></el-input>
          </el-form-item>
        </el-form>
        <div class="login_btn">
          <el-button type="primary" @click="doReset">撤销</el-button>
          <el-button type="primary" @click="doLogin">登录</el-button>
        </div>

      </div>
    </div>

    <!--<div>

    </div>-->
  </div>
</template>

<script>
import http from '@/assets/js/public'
var sysConfig = require('@/assets/js/sysConfig')
export default {
  name: 'Login',
  data() {
    return {
      username: 'aaa',
      password: '123',
      imgNum: ''
    }
  },

  methods: {
    doLogin() {
      const _this = this
      http.requestPost(sysConfig.urlPreUser + '/oauth/login', { username: this.username, password: this.password })
        .then((data) => {
          if (data.state === 200){
            this.$router.push({ path: '/index/goods' })
            const userInfo = data.data
            // 存储token
            sessionStorage.setItem(sysConfig.accessTokenKey, userInfo.jwtToken)
            sessionStorage.setItem(sysConfig.refreshTokenKey, userInfo.refreshToken)
            userInfo.jwtToken = ''
            userInfo.refreshToken = ''
            // 存储用户信息
            sessionStorage.setItem(sysConfig.userInfo, JSON.stringify(userInfo))
          } else if (data.state === 400){
            _this.$message({
              message: data.fail,
              type: 'warning',
              showClose: true
            });
          }
        }, () => {
          this.$message({
            message: '登录失败',
            type: 'warning',
            showClose: true
          });
        })
      // this.$router.push({ path: '/goods' })
    },
    doReset(){
      this.password = '';
      this.username = '';
    }
  },

  created() {
    var num = Math.floor(Math.random() * 10 + 1) % 2
    this.imgNum = '../../public/' + num + '.jpg'
  },

  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: cadetblue;
  }

  .login_img {
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #eee;
    border-radius: 50%;
    position: absolute;
    top: -25%;
    margin-left: auto;
    transform: translate(145px, 0);
  }

  div.login_img img {
    width: 90%;
    border-radius: 50%;
    position: absolute;
    top: 7%;
    left: 5%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 20px;
    /*position: absolute;
    left: 50%;
    top: 50%;*/
    margin-left: 50%;
    transform: translate(-50%, 50%);
  }

  .login_btn {
    float: right;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .login_form {
    position: absolute;
    bottom: 5%;
    width: 98%;
    padding-left: 1%;
    padding-right: 1%;
  }
</style>
