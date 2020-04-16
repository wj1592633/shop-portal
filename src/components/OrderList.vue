<template>
  <div>
    <div>
    <el-table
      :data="records"
      border
      style="width: 100%">
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="goodsNum"
        label="数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="payPrice"
        label="价格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="takeTime"
        label="下单时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="payTime"
        label="支付时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="stateStr"
        label="状态"
        width="150">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="payOrder(scope.row)">支付</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      records: [],
      pageInfo: {
        total: 0,
        size: 1,
        current: 1,
        keyword: ''
      }
    }
  },
  methods: {
    payOrder(row){
      http.requestGet(sysConfig.urlPreUser + '/user/pay', { orderId: row.orderId, userId: row.userId }).then((data) => {
        if (data.state === 200){
          this.$message({
            message: data.data,
            type: 'success',
            showClose: true
          });
        } else {
          this.$message({
            message: data.fail,
            type: 'warning',
            showClose: true
          });
        }
      }, () => {
        this.$message({
          message: '支付失败~',
          type: 'warning',
          showClose: true
        });
      })
    },
    handleSizeChange(val) {
      this.pageInfo.size = val
      this.handleCurrentChange()
    },
    handleCurrentChange(val) {
      this.pageInfo.current = val
      http.requestGet(sysConfig.urlPreOrder + '/order/records', this.pageInfo).then((data) => {
        const result = data.data
        if (data.state === 200){
          this.pageInfo.total = result.total
          this.records = result.records
        }
      }, () => {
        // 待处理 todo
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
