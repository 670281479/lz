<template>
  <el-col :span="12" :offset="5">
    <div class="grid-content bg-purple">
   
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <el-form-item label="">
       <el-upload
        class="avatar-uploader"
        action="#"
        :http-request="upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
     <el-form-item label="姓名:" prop="name">
      <el-input v-model.number="ruleForm.name"></el-input>
    </el-form-item>
     <el-form-item label="性别:" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
     <el-form-item label="手机号:" prop="phone">
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
       <el-form-item label="邮箱:" prop="emil">
      <el-input v-model.number="ruleForm.emil"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="出生日期:" prop="age">
        <el-date-picker
          v-model="ruleForm.age"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div></el-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'personal',
  components: {
  },
  computed: {
    ...mapGetters([])
  },
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('出生日期不能为空'));
        }else{
           callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        }else{
          callback();
        }
      };
      var validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('姓名不能为空'));
        } else {
          callback();
        }
      };
      return {
        imageUrl: '',
        ruleForm: {
          name:'',
          sex: "0",//0:男/1：女   默认0
          phone:'',
          emil:'',
          pass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      upload (data) {
      let _this = this;
      let rd = new FileReader(); // 创建文件读取对象
      let file = data.file;
      rd.readAsDataURL(file); // 文件读取装换为base64类型
      rd.onloadend = function (e) {
        console.log(this.ruleForm)
        // _this.data.imageUrl = this.result; // this指向当前方法onloadend的作用域
      }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
    width: 138px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 138px;
    height: 138px;
    display: block;
  }
</style>
