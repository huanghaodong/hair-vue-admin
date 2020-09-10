<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :inline="true" :model="listQuery" class="demo-form-inline" inline-message>
      <el-form-item label="申请人账号：" prop="mobile">
        <el-input v-model="listQuery.mobile" size="small"/>
      </el-form-item>
      <el-form-item label="申请人昵称：" prop="nickname">
        <el-input v-model="listQuery.nickname" size="small"/>
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
        label="手机"
        width="180"/>
      <el-table-column
        align="center"
        prop="nickname"
        label="昵称"
        width="180"/>
      <el-table-column
        align="center"
        prop="gender"
        label="性别"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.gender ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="balance"
        label="余额（元）">
				<template slot-scope="scope">
					{{ scope.row.balance | Fen2YuanFormate }}
				</template>
			</el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        label="创建日期">
        <template slot-scope="scope">
        {{scope.row.create_time | timeFormate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleInfo(scope.row, scope.$index)" >修改信息</el-button>
          <router-link :to="'/user/payment/'+scope.row.mobile">
            <el-button type="text" size="small">用户流水</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_num" :limit.sync="listQuery.page_size" @pagination="fetchData" />

    <el-dialog :visible.sync="dialogFormVisible" title="收货地址">
      <el-form ref="infoForm" :model="form" :rules="infoRules" >
        <el-form-item :label-width="formLabelWidth" label="昵称" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off" style="width: 60%" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别" style="width: 60%" >
            <el-option :value="0" label="男"/>
            <el-option :value="1" label="女"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Moment from 'moment' 
import { getUserList, getUserCount, updateUserinfo } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { isvalidUsername } from '@/utils/validate'

export default {
  components: { Pagination },
  filters:{
    timeFormate: function (value) {
        if (!value) return ''
        return Moment(value*1000).format('YYYY-MM-DD hh:mm:ss')
      }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        mobile: '',
        nickname: '',
        time: '',
        page_num: 1,
        page_size: 10
      },
      dialogFormVisible: false,
      loading: false,
      infoRules: {
        nickname: [{ required: true, trigger: 'blur', validator: validateUsername }],
        gender: [{ required: true, trigger: 'blur' }]
      },
      form: {
        mobile: '',
        nickname: '',
        gender: 0
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this._getUserCount()
    this.fetchData()
  },
  methods: {
    handleFilter() {
      this.listQuery.page_num = 1
      this._getUserCount()
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    _getUserCount() {
      const data = {
        ...this.listQuery
      }
      if (this.listQuery.time) {
        data.start_time = this.listQuery.time[0]
        data.end_time = this.listQuery.time[1]
      }
      getUserCount(data).then(response => {
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
      getUserList(data).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleInfo(item, index) {
      const { mobile, nickname, gender } = item
      this.tempIndex = index
      this.form = {
        mobile,
        nickname,
        gender
      }
      this.dialogFormVisible = true
    },
    submitInfo() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.loading = true
          updateUserinfo(this.form).then(data => {
            this.list[this.tempIndex].gender = this.form.gender
            this.list[this.tempIndex].nickname = this.form.nickname
            this.loading = false
            this.dialogFormVisible = false
          }).catch(() => {
            this.loading = false
            this.dialogFormVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
