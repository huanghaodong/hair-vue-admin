<template>
  <div class="app-container">
    <el-row type="flex" justify="space-around" style="padding-top: 10%">
      <el-col :span="10">
        <el-card class="box-card">
          <div style="text-align: center" @click="openDialog1">
            <h1>会员消费</h1>
            <p style="margin-top: 50px">会员消费通道，消费卡内余额</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div style="text-align: center" @click="openDialog2">
            <h1>临时消费</h1>
            <p style="margin-top: 50px">临时消费通道，临时洗剪吹烫染</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogRevenueFormVisible1" :close-on-click-modal="false" title="会员消费">
			<el-row>
				<el-col :span="16">
					<el-form ref="revenueForm1" :model="revenueForm1" :rules="revenueRules1" >
						<!--        <el-form-item :label-width="formLabelWidth" label="会员手机" prop="mobile">-->
						<!--          <el-input v-model="revenueForm1.mobile" autocomplete="off" style="width: 60%" />-->
						<!--        </el-form-item>-->
						<el-form-item :label-width="formLabelWidth" label="会员手机" prop="mobile">
							<el-select
								v-model="revenueForm1.mobile"
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
						<el-form-item :label-width="formLabelWidth" label="消费金额" prop="money">
							<el-input v-model="revenueForm1.money" autocomplete="off" style="width: 80%" />
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="备注" prop="remark">
							<el-input v-model="revenueForm1.remark" type="textarea" style="width: 80%"/>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
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
				</el-col>
			</el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRevenueFormVisible1 = false">取 消</el-button>
        <el-button :loading="loading1" type="primary" @click="submitForm1">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogRevenueFormVisible2" :close-on-click-modal="false" title="临时消费">
      <el-form ref="revenueForm2" :model="revenueForm2" :rules="revenueRules2" >
        <el-form-item :label-width="formLabelWidth" label="消费金额" prop="money">
          <el-input v-model="revenueForm2.money" autocomplete="off" style="width: 60%" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="支付方式" prop="payment_type">
          <el-select v-model="revenueForm2.payment_type" placeholder="请选择支付方式" style="width: 60%" >
            <el-option :value="0" label="现金"/>
            <el-option :value="1" label="微信"/>
            <el-option :value="2" label="支付宝"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注" prop="remark">
          <el-input v-model="revenueForm2.remark" type="textarea" style="width: 60%"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRevenueFormVisible2 = false">取 消</el-button>
        <el-button :loading="loading2" type="primary" @click="submitForm2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { temporaryPay, memberPay } from '@/api/money'
import { queryUserByMobile } from '@/api/user'
import { isvalidMobile, isvalidMoney } from '@/utils/validate'

export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      console.log(value)
      if (!isvalidMobile(value)) {
        callback(new Error('请输入的手机号'))
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
      dialogRevenueFormVisible1: false,
      loading1: false,
      revenueRules1: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        money: [{ required: true, trigger: 'blur', validator: validateMoney }]
      },
      revenueForm1: {
        mobile: '',
        money: '',
        remark: ''
      },
      dialogRevenueFormVisible2: false,
      loading2: false,
      revenueForm2: {
        money: '',
        payment_type: '',
        remark: ''
      },
      revenueRules2: {
        money: [{ required: true, trigger: 'blur', validator: validateMoney }],
        payment_type: [{ required: true, trigger: 'blur' }]
      },
      formLabelWidth: '120px',
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
      console.log('擦擦擦')
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
    openDialog1() {
      this.dialogRevenueFormVisible1 = true
      this.$nextTick(() => {
        this.$refs.revenueForm1.resetFields()
				this.userinfo = {
          mobile: '',
          nickname: '',
          gender: -1,
          balance: 0
        }
        this.userList = []
      })
    },
    openDialog2() {
      this.dialogRevenueFormVisible2 = true
      this.$nextTick(() => {
        this.$refs.revenueForm2.resetFields()
      })
    },
    submitForm1() {
      this.$refs.revenueForm1.validate(valid => {
        if (valid) {
          this.loading1 = true
          if(this.regYuanToFen(this.revenueForm1.money) > this.userinfo.balance){
            this.$message.error('余额不足!')
            this.loading1 = false
						return
					}
          let param = {
            ...this.revenueForm1,
						money: this.regYuanToFen(this.revenueForm1.money)
					}
          memberPay(param).then(data => {
            this.loading1 = false
            this.dialogRevenueFormVisible1 = false
          }).catch(() => {
            this.loading1 = false
            this.dialogRevenueFormVisible1 = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm2() {
      this.$refs.revenueForm2.validate(valid => {
        if (valid) {
          this.loading2 = true
          let param = {
            ...this.revenueForm2,
            money: this.regYuanToFen(this.revenueForm2.money)
          }
          temporaryPay(param).then(data => {
            this.loading2 = false
            this.dialogRevenueFormVisible2 = false
          }).catch(() => {
            this.loading2 = false
            this.dialogRevenueFormVisible2 = false
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
	.box-card{
		cursor: pointer;
	}
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
</style>
