<template>
	<div class="app-container">
		<el-row type="flex" justify="center" style="padding-top: 5%">
			<el-col :span="12">
				<el-card class="box-card">
					<el-row type="flex" justify="center">
						<el-col :span="20">
							<h2 style="text-align: center">修改密码</h2>
						</el-col>
					</el-row>
					<el-form ref="form" :model="formData" :rules="rules" >
						<el-form-item :label-width="formLabelWidth" label="旧密码" prop="old_password">
							<el-input v-model="formData.old_password" autocomplete="off" style="width: 80%" type="password" />
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="新密码" prop="new_password">
							<el-input v-model="formData.new_password" autocomplete="off" style="width: 80%" type="password" />
						</el-form-item>
						<el-form-item :label-width="formLabelWidth" label="确认新密码" prop="renew_password">
							<el-input v-model="formData.renew_password" autocomplete="off" style="width: 80%" type="password" />
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
  import { changePassword } from '@/api/login'

  export default {
    data() {
      var validatPassword = (rule, value, callback) => {
        console.log(value)
        if (this.formData.new_password !== this.formData.renew_password) {
          callback(new Error('两次输入不一致'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          old_password: [{ required: true,  min: 6, trigger: 'blur', message: '请输入至少6位密码'}],
          new_password: [{ required: true,  min: 6, trigger: 'blur', message: '请输入至少6位密码'}],
          renew_password: [{ required: true, min: 6, trigger: 'blur', message: '两次输入不一致', validator: validatPassword}],

        },
        formData: {
          old_password: '',
          new_password: '',
          renew_password: ''
        },
        formLabelWidth: '120px',
        loading: false,
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
            }
            changePassword(param).then(data => {
              this.$message.success('修改成功!')
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
