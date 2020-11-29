<template>
    <div class="login_container">
        <div class="login_box">
            <!-- logo -->
            <div class="logo_box">
                <img src="../../assets/logo.jpg" alt="">
            </div>
            <!-- login form -->
            <el-form ref="LoginFormRef" :rules="LoginFormRules" class="form_box" :model="LoginForm">
                    <el-form-item label="ID" prop="user">
                        <el-input v-model="LoginForm.user" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item label="password" prop="password">
                        <el-input :type="passType[TIndex]" v-model="LoginForm.password" prefix-icon="el-icon-lock">
                            <i slot="suffix" class="el-icon-view" @click="showPass"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="btn_box">
                        <el-button type="primary" @click="SubmitForm">login</el-button>
                        <el-button type="default" @click="ResetForm">reset</el-button>
                        <br>
                        Don't have an account?
                        <el-button type="text" @click="Register">Sign Up</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                LoginForm: {
                    user: '1',
                    password: '1'
                },
                LoginFormRules:{
                    user:[{required:true,message:"please input your email",trigger:"blur"}],
                    password:[{required:true,message:"please input password",trigger:"blur"}]
                },
                passType:["password",""],
                TIndex:0
            };

        },
        methods:{
            SubmitForm() {
                this.$refs.LoginFormRef.validate(valid=>{
                    if(valid) {
                        console.log(this.LoginForm.user);
                        console.log(this.LoginForm.password);
                        this.$router.push('/Home')
                    }else{
                        this.$message.error("非法内容");
                    }

                });
            },
            ResetForm() {
                this.$refs.LoginFormRef.resetFields();
            },
            Register(){
                this.$router.push('/Register')
            },
            showPass(){
                this.TIndex=1-this.TIndex
            }
        },
    }
</script>

<style scoped>
    .login_container{
        background-color: #7cd7c0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
    }

    .login_box{
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
