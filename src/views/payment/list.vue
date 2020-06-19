<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :inline="true" :model="listQuery" class="demo-form-inline" inline-message>
			<el-form-item label="消费类型：" prop="consume_type">
				<el-select v-model="listQuery.consume_type" size="small" placeholder="请选择">
					<el-option label="全部" value=""> </el-option>
					<el-option label="会员充值" value="0"> </el-option>
					<el-option label="临时消费" value="1"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="支付方式：" prop="payment_type">
				<el-select v-model="listQuery.payment_type" size="small" placeholder="请选择">
					<el-option label="全部" value=""> </el-option>
					<el-option label="现金" value="0"> </el-option>
					<el-option label="微信" value="1"> </el-option>
					<el-option label="支付宝" value="1"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户手机：" prop="mobile">
				<el-input v-model="listQuery.mobile" size="small"/>
			</el-form-item>
			<el-form-item label="操作人：" prop="oprate_admin">
				<el-input v-model="listQuery.oprate_admin" size="small"/>
			</el-form-item>
      <el-form-item label="申请时间：" prop="time">
        <el-date-picker
          v-model="listQuery.time"
          type="datetimerange"
          value-format="timestamp"
          format="yyyy-MM-dd HH:mm:ss"
          size="small"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="mobile"
        label="会员手机"
        width="180">
				<template slot-scope="scope">
					{{ scope.row.mobile || '无' }}
				</template>
			</el-table-column>
      <el-table-column
        align="center"
        prop="pay_type"
        label="消费类型"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.consume_type ? '临时消费' : '会员充值' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="pay_price"
        label="金额（元）">
				<template slot-scope="scope">
					{{ scope.row.pay_price | Fen2YuanFormate }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="pay_type"
				label="支付方式"
				width="180">
				<template slot-scope="scope">
					{{ scope.row.payment_type === 0 ? '现金' : scope.row.payment_type === 1 ? '微信' : '支付宝' }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="oprate_admin"
				label="操作人"
				width="180"/>
      <el-table-column
        align="center"
        prop="create_time"
        label="操作日期"/>
			<el-table-column
				align="center"
				prop="remark"
				label="备注"
				width="180"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_num" :limit.sync="listQuery.page_size" @pagination="fetchData" />
  </div>
</template>

<script>
import { getRevenueList, getRevenueCount } from '@/api/money'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        mobile: '',
        consume_type: '',
        payment_type: '',
        oprate_admin: '',
        time: '',
        page_num: 1,
        page_size: 10
      }
    }
  },
  created() {
    this._getRevenueCount()
    this.fetchData()
  },
  methods: {
    handleFilter() {
      this.listQuery.page_num = 1
      this._getRevenueCount()
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    _getRevenueCount() {
      const data = {
        ...this.listQuery
      }
      if (this.listQuery.time) {
        data.start_time = this.listQuery.time[0]
        data.end_time = this.listQuery.time[1]
      }
      getRevenueCount(data).then(response => {
        this.total = response.data
      })
    },
    fetchData() {
      this.listLoading = true
      const data = {
        ...this.listQuery
      }
      if (this.listQuery.time) {
        data.start_time = this.listQuery.time[0]
        data.end_time = this.listQuery.time[1]
      }
      getRevenueList(data).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
