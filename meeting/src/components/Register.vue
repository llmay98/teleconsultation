<template>
    <div class="reg_container">
        <div class="reg_box">
            <!-- logo -->
            <div class="logo_box">
                <img src="../assets/logo.jpg" alt="">
            </div>
            <!-- login form -->
            <el-form ref="RegFormRef" :rules="RegFormRules" class="form_box" :model="RegForm">
                <el-form-item label="ID" prop="user">
                    <el-input v-model="RegForm.user" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="RegForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item label="confirm password" prop="con_password">
                    <el-input v-model="RegForm.con_password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btn_box">
                    <el-button type="primary" @click="SubmitForm">register</el-button>
                    <el-button type="default" @click="ResetForm">reset</el-button>
                    <br>
                    Already have an account?
                    <el-button type="text" @click="BackToLogin">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data(){
            let CheckPassword=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('please confirm password'))
                }
                else if(value!==this.RegForm.password){
                    callback(new Error('different password'))
                }
                else{
                    callback()
                }
            };
            return{
                  RegForm: {
                      user: '',
                      password: '',
                      con_password:''
                  },
                  RegFormRules:{
                      user:[{required:true,message:"please input your email",trigger:"blur"}],
                      password:[{required:true,message:"please input password",trigger:"blur"}],
                      con_password:[{required:true,validator:CheckPassword,trigger:"blur"}]
                  },
              };
            },
            methods:{
                SubmitForm(){

                },
                ResetForm(){

                },
                BackToLogin(){
                    this.$router.push('/Login')
                }
            }
    }
</script>

<style scoped>
    .reg_container{
        background-color: #7cd7c0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
    }

    .reg_box{
        width:500px;
        /*height:80%;*/
        border-radius: 5px;
        background-color: azure;
        display: flex;
        flex-direction: column;
        align-items: center;
        /*justify-content: center;*/
        box-sizing: content-box;
    }

    .logo_box{
        margin-top: 20px;
        width:150px;
        height:150px;
        border-radius: 100%;
        border:3px solid green;
    }

    .logo_box img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .form_box{
        width: 100%;
        height:100%;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .btn_box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        /*height: 100%;*/
        box-sizing:border-box;
    }

</style>
