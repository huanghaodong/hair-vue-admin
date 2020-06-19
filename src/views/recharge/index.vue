<template>
	<div class="app-container">
		<el-row type="flex" justify="center" style="padding-top: 5%">
			<el-col :span="12">
				<el-card class="box-card">
					<el-row type="flex" justify="center">
						<el-col :span="20">
							<h1 style="text-align: center">会员充值</h1>
						</el-col>
					</el-row>
					<div style="display: flex;flex-direction: row;">
						<div :class="[userinfo.mobile ? 'left-box-in':'left-box-out']" class="left-box">
							<el-form ref="form" :model="formData" :rules="rules" >
								<el-form-item :label-width="formLabelWidth" label="会员手机" prop="mobile">
									<el-select
										v-model="formData.mobile"
										:remote-method="querySearchAsync"
										@change="handleSelectChange"
										:loading="selectLoading"
										filterable
										remote
										placeholder="请输入手机号"
										style="width: 80%">
										<el-option
											v-for="item in userList"
											:key="item.mobile"
											:label="item.mobile"
											:value="item.mobile"
										/>
									</el-select>
								</el-form-item>
								<el-form-item :label-width="formLabelWidth" label="充值金额" prop="money">
									<el-input v-model="formData.money" autocomplete="off" style="width: 80%" />
								</el-form-item>
								<el-form-item :label-width="formLabelWidth" label="支付方式" prop="payment_type">
									<el-select v-model="formData.payment_type" placeholder="请选择支付方式">
										<el-option label="现金" :value="0"> </el-option>
										<el-option label="微信" :value="1"> </el-option>
										<el-option label="支付宝" :value="2"> </el-option>
									</el-select>
								</el-form-item>
								<el-form-item :label-width="formLabelWidth" label="备注" prop="remark">
									<el-input v-model="formData.remark" type="textarea" style="width: 80%"/>
								</el-form-item>
							</el-form>
						</div>
						<div :class="[userinfo.mobile ? 'right-box-in':'right-box-out']" class="right-box">
							<el-card class="box-card">
								<div>
									<div style="text-align: center;margin-bottom: 20px;">
										<img class="avatar" v-if="userinfo.gender === -1" src="@/assets/default-avatar-0.png" alt="头像">
										<img class="avatar" v-else-if="userinfo.gender === 1" src="@/assets/default-avatar-1.png" alt="头像">
										<img class="avatar" v-else src="@/assets/default-avatar-2.png" alt="头像">
									</div>
									<el-row style="margin-top: 10px">
										<el-col :span="8">
											<span class="user-label-text">昵称：</span>
										</el-col>
										<el-col :span="16">
											<span class="user-value-text">{{userinfo.nickname}}</span>
										</el-col>
									</el-row>
									<el-row style="margin-top: 10px">
										<el-col :span="8">
											<span class="user-label-text">手机：</span>
										</el-col>
										<el-col :span="16">
											<span class="user-value-text">{{userinfo.mobile}}</span>
										</el-col>
									</el-row>
									<el-row style="margin-top: 10px">
										<el-col :span="8">
											<span class="user-label-text">余额：</span>
										</el-col>
										<el-col :span="16">
											<span class="user-banlance-text">{{userinfo.balance | Fen2YuanFormate}}</span>
										</el-col>
									</el-row>
								
								</div>
							</el-card>
						</div>
					</div>
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
  import { queryUserByMobile } from '@/api/user'
  import { memberRecharge } from '@/api/money'
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
          payment_type:[{ required: true, trigger: 'blur', message: '请选择支付方式'}],
          mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
          money: [{ required: true, trigger: 'blur', validator: validateMoney }]
        },
        formData: {
          mobile: '',
          money: '',
          payment_type: '',
					remark: ''
        },
        formLabelWidth: '120px',
        loading: false,
        userList: [],
        userinfo: {
          mobile: '',
          nickname: '',
          gender: -1,
          balance: 0
        },
        selectLoading: false
      }
    },
    created() {

    },
    methods: {
      querySearchAsync(queryString) {
        this.selectLoading = true
        queryUserByMobile({
          mobile: queryString
        }).then(res => {
          this.selectLoading = false
          this.userList = res.data
        })
      },
      handleSelectChange(mobile) {
        this.userList.forEach((v) => {
          if (v.mobile === mobile) {
            this.userinfo = v
          }
        })
      },
      submitForm(){
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            let param = {
              ...this.formData,
              money: this.regYuanToFen(this.formData.money)
            }
            memberRecharge(param).then(data => {
              this.$message.success('充值成功!')
              this.loading = false
              this.$refs.form.resetFields()
              this.userinfo = {
                mobile: '',
                nickname: '',
                gender: -1,
                balance: 0
              }
              this.userList = []
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

	.avatar{
		width: 40%;
	}
	.user-label-text{
		font-size: 12px;
	}
	.user-value-text{
		font-size: 14px;
		font-weight: bolder;
	}
	.user-banlance-text{
		font-size: 16px;
		font-weight: bolder;
		color: red;
	}
	.left-box{
		transition: all .4s ease-in;
	}
	.left-box-in{
		width: 66.66%;
	}
	.left-box-out{
		width: 100%;
	}
	.right-box{
		transition: all .4s ease-in;
	}
	.right-box-in{
		width: 33.33%;
		opacity: 1;
	}
	.right-box-out{
		width: 0%;
		opacity: 0;
	}
</style>
