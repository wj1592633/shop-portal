<template>
  <div class="login">
    <div class="goods_list">
      <div class="goods_item" @click="gotoDetails(record)" v-for="(record) in records" :key="record.goodsId">
        <!--<img :src="record.goodsSkus[0].picture">-->
        <img src="../assets/0.jpg">
        <div>{{record.name}}<!--goodsDesc,goodsId,name,title,goodsId，tartTime +'&#45;&#45;'+record.endTime-->
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.current"
        :page-sizes="[1, 2, 8]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import http from '@/assets/js/public'
var sysConfig = require('@/assets/js/sysConfig')
export default {
  data() {
    return {
      pageInfo: {
        total: 0,
        size: 1,
        current: 1,
        keyword: ''
      },
      records: []
    }
  },
  methods: {
    gotoDetails(record){
      sessionStorage.setItem(sysConfig.goodsInfo, JSON.stringify(record))
      this.$router.push({
        name: 'goodsInfo'
      })
    },
    handleSizeChange(val) {
      this.pageInfo.size = val
      this.handleCurrentChange()
    },
    handleCurrentChange(val) {
      this.pageInfo.current = val
      http.requestGet(sysConfig.urlPreGoods + '/goods/list', this.pageInfo).then((data) => {
        const result = data.data
        if (data.state === 200){
          this.pageInfo.total = result.total
          this.records = result.records
        }
      }, () => {
      })
    }
  },
  created(){
    this.handleCurrentChange()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goods_list {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    width: 80%;
    height: 100%;
  }

  .goods_item {
    width: 20%;
    height: 150px;
    float: left;
    margin: 20px 10px;
    padding-bottom: 50px;
  }
  .goods_item img {
    width: 100%;
  }
  .goods_item:hover {
    cursor: pointer;
  }
</style>
