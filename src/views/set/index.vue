<template>
  <div class="app-container">
    <el-row type="flex" justify="center" style="padding-top: 5%">
      <el-col :span="8">
        <el-card class="box-card">
					<el-row type="flex" justify="center">
						<el-col :span="20">
							<h2 style="text-align: center;margin-bottom: 50px;">修改头像</h2>
						</el-col>
					</el-row>
					<div style="display: flex;justify-content: center;align-items: center">
						<el-upload
							:show-file-list="false"
							:multiple="false"
							:on-success="handleAvatarSuccess"
							name="avatar"
							:headers="{'Token':token}"
							:before-upload="beforeAvatarUpload"
							class="avatar-uploader"
							:action="actionUrl">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"/>
						</el-upload>
					</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { memberRecharge } from '@/api/money'
import { isvalidMobile, isvalidMoney } from '@/utils/validate'
import { mapGetters } from 'vuex'

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
        payment_type: [{ required: true, trigger: 'blur', message: '请选择支付方式' }],
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
      imageUrl: '',
      actionUrl: process.env.BASE_API + '/upload/avatar'
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {

  },
  methods: {

    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const param = {
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$store.dispatch('GetInfo')
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2
			console.log(file)
      if (!isImg) {
        this.$message.error('上传正确的格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImg && isLt2M
    }
  }
}
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
	.box-card{
		height: 400px;
	}
</style>
