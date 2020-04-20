<template>
  <div class="goods-info">
    <div class="goods-info-top">
      <!--左侧图片-->
      <div class="goods-info-img"><img src="../../public/0.jpg"></div>
      <!--右侧商品参数-->
      <div class="goods-params">
        <ul>
          <li>{{goods.name}}</li>
          <li>{{goods.title}}</li>
          <li class="skuParams">
            <span>规格选择:</span>
            <span class="skuParamSelect" :class="{selectSku: currentIndex === index}" v-for="(sku,index) in skus" @click="changeSku(sku,index)" :key="sku.skuId">{{sku.skuParams.replace('{','').replace('}','')}}</span>
          </li>
          <!--{{JSON.stringify(skus[0].skuParams).replace('\"','')}}-->
          <li>当前选中:{{currentSku.skuParams.replace('{','').replace('}','')}}</li>
          <li>价格：{{currentSku.price}}元</li>
          <li>库存：{{currentSku.skuReserve}}</li>
          <li class="buy-btn"><el-button type="primary" @click="doBuy">购买</el-button></li>
        </ul>
      </div>

    </div>
    <!--下面按钮-->
  </div>
</template>

<script>
import http from '@/assets/js/public'
var sysConfig = require('@/assets/js/sysConfig')
export default {
  data() {
    return {
      goods: {},
      currentSku: {},
      currentIndex: 0,
      isSelect: false,
      skus: []
    }
  },
  methods: {
    changeSku(sku, index){
      this.currentIndex = index
      this.currentSku = sku
    },
    doBuy(){
      // 登录校验
      const token = sessionStorage.getItem(sysConfig.accessTokenKey)
      if (token){
        const goods = JSON.parse(JSON.stringify(this.goods))
        goods.skuParams = this.currentSku.skuParams
        goods.skuId = this.currentSku.skuId
        goods.goodsPricePer = this.currentSku.price
        goods.startTime = ''
        goods.skus = ''
        goods.endTime = ''
        http.requestPost(sysConfig.urlPreOrder + '/order/add', goods).then((data) => {
          this.$message({
            message: data.data,
            type: 'success',
            showClose: true
          });
        }, () => {
          this.$message({
            message: '操作失败',
            type: 'warning',
            showClose: true
          });
        })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  },
  created(){
  },
  mounted(){
    var goodsStr = sessionStorage.getItem(sysConfig.goodsInfo)
    var goods = JSON.parse(goodsStr)

    this.goods = goods
    http.requestGet(sysConfig.urlPreGoods + '/sku/' + goods.goodsId).then((data) => {
      if (data.state === 200){
        this.skus = data.data
        this.currentSku = this.skus[0]
      }
    }, () => {
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods-info {
  width: 100%;
  border: 1px solid yellow;
  display: flex;
}
.goods-info-top {
  overflow: hidden;
}
.goods-info-img,.goods-params {
  float: left;
  margin-right: 40px;
}
ul {
  list-style-type:none;
  margin:0px;
  overflow: hidden;
  display: block;
  text-align: left;
}
.buy-btn {
  position: absolute;
  bottom: 10px;
}
.skuParams {
  display: block;
}
.skuParam {
  display: block;
  border: 1px solid #2c3e50;
  margin-left: 10px;
  border-radius: 20px;
  background-color: darkturquoise;
}
.skuParamSelect {
  display: block;
  border: 1px solid #2c3e50;
  margin-left: 10px;
  border-radius: 20px;
  background-color: lightgray;
}
.skuParamSelect:hover {
  cursor: pointer;
}
span {
  float: left;
}
.goods-info-top img {
  width: 300px;
}
.selectSku {
  background-color: #8cc5ff;
}
</style>
