<template>
  <div class="app-container">
  	<el-row type="flex" justify="center" style="padding-top: 5%">
			<el-col :span="12">
				<el-card class="box-card">
					<el-row type="flex" justify="center">
						<el-col :span="20">
							<h1 style="text-align: center">新增会员</h1>
						</el-col>
					</el-row>
					<el-form ref="form" :model="formData" :rules="rules" >
						<el-form-item :label-width="formLabelWidth" label="会员手机" prop="mobile">
							<el-input v-model="formData.mobile" autocomplete="off" style="width: 80%" />
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="昵称" prop="nickname">
							<el-input v-model="formData.nickname" autocomplete="off" style="width: 80%" />
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
							<el-select v-model="formData.gender" placeholder="请选择性别" style="width: 80%">
								<el-option label="男" :value="0"> </el-option>
								<el-option label="女" :value="1"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="充值金额" prop="money">
							<el-input v-model="formData.money" autocomplete="off" style="width: 80%" />
						</el-form-item>
					</el-form>
					<el-row type="flex" justify="center" style="padding-top: 30px">
						<el-col :span="18">
							<el-button :loading="loading" type="primary" @click="submitForm" style="width: 100%">确 定</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
  </div>
</template>

<script>
import { createUserinfo } from '@/api/user'
import { isvalidMobile, isvalidMoney } from '@/utils/validate'

export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      console.log(value)
      if (!isvalidMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    var validateMoney = (rule, value, callback) => {
      console.log(value)
      if (!isvalidMoney(value)) {
        callback(new Error('请输入金额'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        gender:[{ required: true, trigger: 'blur', message: '请选择性别'}],
        nickname:[{ required: true, trigger: 'blur', message: '请输入昵称'}],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        money: [{ required: true, trigger: 'blur', validator: validateMoney }]
      },
      formData: {
        mobile: '',
        nickname: '',
				gender: '',
				money: ''
      },
      formLabelWidth: '120px',
      loading: false
    }
  },
  created() {
  
  },
  methods: {
    submitForm(){
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let param = {
            ...this.formData,
            money: this.regYuanToFen(this.formData.money)
          }
          createUserinfo(param).then(data => {
            this.$message.success('创建新会员成功!')
            this.loading = false
						this.$refs.form.resetFields()
          }).catch(() => {
            this.loading = false
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
