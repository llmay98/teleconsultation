<template>
    <el-container class="outside">
        <el-header>
            <h2>会诊系统主界面</h2>
        </el-header>
        <el-container class="inner">
            <el-main>
                <!--                加入会诊-->
                <div class="login_box">
                    <!-- logo -->
                    <div class="logo_box">
                        <img src="../../assets/logo.jpg" alt="">
                    </div>
                    <!-- login meeting form -->
                    <el-form ref="LoginMeetFormRef" :rules="LoginMeetFormRules" class="form_box" :model="LoginMeetForm">
                        <el-form-item label="与会姓名" prop="username">
                            <el-input name="name" id="name" v-model="LoginMeetForm.username" prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item label="会议号" prop="mid" >
                            <el-input name="room" id="roomName" v-model="LoginMeetForm.mid" prefix-icon="el-icon-key"></el-input>
                        </el-form-item>
                        <el-form-item class="btn_box">
                            <el-button type="primary" @click="SubmitMeetLoginForm">join</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "MobileHome",
        data(){
            return{
                LoginMeetForm:{
                    username:'',
                    mid:''
                },
                LoginMeetFormRules:{
                    username:[{required:true,message:"please input your name",trigger:"blur"}],
                    mid:[{required:true,message:"please input mid",trigger:"blur"}]
                },
            };
        },
        methods: {
            //判断是否为移动端
            _isMobile() {
                return navigator.userAgent.match(
                    /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
                );
            },

            //加入会诊页函数
            SubmitMeetLoginForm() {
                this.$refs.LoginMeetFormRef.validate(valid=>{
                    if(valid) {
                        let name = document.getElementById('name').value;
                        let room = document.getElementById('roomName').value;
                        this.$root.MeetingMessage={
                            id: 'joinRoom',
                            name: name,
                            room: room,
                        };
                        console.log(this.$root.MeetingMessage);
                        if (this._isMobile()) {
                            // 手机端
                            this.$router.push("/mobilemeeting");
                        } else {
                            // pc端
                            this.$router.push("/meeting");
                        }
                    }else{
                        this.$message.error("非法内容");
                    }

                });
            },

        },
    }
</script>

<style scoped>
    /*整体*/
    .outside{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .el-header{
        display: flex;
        width: 100%;
        background-color: #1ecdaa;
        align-items: center;
        justify-content: center;
    }

    .el-main{
        display: flex;
        height: 100%;
        width: 100%;
        background-color: #c3ffea;
    }

    .inner{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    /*加入会议*/
    .login_box{
        width:100%;
        height: 100%;
        border-radius: 5px;
        background-color: azure;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
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
        position: relative;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
    }

    .btn_box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing:border-box;
    }
</style>
