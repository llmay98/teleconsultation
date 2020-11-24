<template>
    <el-container class="outside">
        <el-header>
            <h2>会诊系统主界面</h2>
<!--            <el-button-->
<!--                    style="position: absolute;right:100px"-->
<!--                    type="primary"-->
<!--                    round-->
<!--                    @click="GotoMine">mine</el-button>-->
<!--            <el-button-->
<!--                    style="position: absolute;right: 0"-->
<!--                    type="primary"-->
<!--                    round-->
<!--                    @click="LogOut">logout</el-button>-->
        </el-header>
        <el-container class="inner">
            <el-aside width="15%">
                <el-menu class="menu_box">
                    <el-menu-item index="1" @click="Reserve">预约会诊</el-menu-item>
                    <el-menu-item index="2" @click="LoginMeeting">加入会诊</el-menu-item>
                    <el-menu-item index="3" @click="ShowMyMeeting">我的会诊</el-menu-item>
                    <el-menu-item index="4" @click="ShowMyPatient">我的病人</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
<!--                预约会诊-->
                <div v-show="this.item_index==='1'">
                    <el-form :model="ReserveForm" :rules="ReserveFormRules" ref="ReserveForm" label-width="100px">
                        <el-form-item label="工号" prop="ID">
                            <el-input v-model="ReserveForm.ID"></el-input>
                        </el-form-item>
                        <el-form-item label="病人ID" prop="PID">
                            <el-input v-model="ReserveForm.PID"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间" prop="StartTime">
                            <el-date-picker
                                    prefix-icon="el-icon-time"
                                    v-model="ReserveForm.StartTime"
                                    type="datetime"
                                    placeholder="选择开始时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间" prop="EndTime">
                            <el-date-picker
                                    prefix-icon="el-icon-time"
                                    v-model="ReserveForm.EndTime"
                                    type="datetime"
                                    placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="btn_box">
                            <el-button type="primary" @click="SubmitReserveForm">submit</el-button>
                            <el-button type="default" @click="ResetForm">reset</el-button>
                        </el-form-item>
                    </el-form>
                </div>
<!--                加入会诊-->
                <div v-show="this.item_index==='2'" class="login_box">
                    <!-- logo -->
                    <div class="logo_box">
                        <img src="../assets/logo.jpg" alt="">
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
<!--                我的会诊-->
                <div v-show="this.item_index==='3'">
                    <el-table
                            class="MTable_container"
                            :data="MeetingList"
                            border
                            >
                        <el-table-column
                                prop="MID"
                                label="会议号"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                prop="PID"
                                label="病人ID"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                prop="StartTime"
                                label="开始时间"
                                width="180px"
                                :formatter="formatDate">
                        </el-table-column>
                        <el-table-column
                                prop="EndTime"
                                label="结束时间"
                                width="180px"
                                :formatter="formatDate">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="120px">
                            <template slot-scope="scope">
                                <el-button
                                        @click.native.prevent="DeleteItem(scope.$index, MeetingList)"
                                        type="text"
                                        style="color: red">
                                    delete
                                </el-button>
                                <el-button
                                        @click.native.prevent="JoinMeeting(scope.$index, MeetingList)"
                                        type="text">
                                    join
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
<!--                我的病人-->
                <div v-show="this.item_index==='4'">
                    <el-table v-show="!this.IsDetail"
                            class="PTable_container"
                            :data="PatientList"
                            border>
                        <el-table-column
                                prop="PID"
                                label="病人号"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                prop="ache"
                                label="病因"
                                width="180px">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="120px">
                            <template slot-scope="scope">
                                <el-button
                                        @click.native.prevent="ShowDetail"
                                        type="text"
                                        size="small">
                                    detail >
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-show="this.IsDetail">
                        <el-button @click="ShowAll" type="text" size="large">< back</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
            let CheckStart=(rule,value,callback)=>{
                let OldTime=new Date();
                if(value===''){
                    callback(new Error('请选择开始时间'))
                }
                else if(value<OldTime){
                    callback(new Error('开始时间不得早于当前'))
                }
                else{
                    callback()
                }
            };
            let CheckEnd=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请选择结束时间'))
                }
                else if(value<this.ReserveForm.StartTime){
                    callback(new Error('结束时间不得早于开始时间'))
                }
                else{
                    callback()
                }
            };
            return{
                item_index:'3',

                ReserveForm: {
                    ID: '',
                    PID:'',
                    StartTime: '',
                    EndTime:''
                },
                ReserveFormRules: {
                    ID: [
                        { required:true, message: '请输入ID', trigger: 'blur' },
                    ],
                    PID:[
                        {required:true, message: '请输入会诊病人ID', trigger: 'blur'}
                    ],
                    StartTime: [
                        { type: 'date', validator:CheckStart, trigger:'blur' }
                    ],
                    EndTime:[
                        { type: 'date', validator:CheckEnd, trigger:'blur'}
                    ]
                },

                input:{
                    MID: '',
                    StartTime: '',
                    EndTime:''
                },
                MeetingList:[],
                PatientList:[
                    {PID:'000001',name:'lc',sex:'male',ache:'headache'},
                    {PID:'000002',name:'zyc',sex:'female',ache:'stomachache'}
                ],

                IsDetail:false,
                DetailTable:{},

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
            //header
            GotoMine() {
                // this.$router.push('/Home/Mine');
                this.$router.push('/Test');
                this.IsDetail = false

            },
            LogOut() {
                this.$router.push('/Login');
                this.IsDetail = false
            },

            //aside
            Reserve(e) {
                this.item_index = e._props.index;
                this.IsDetail = false
            },
            LoginMeeting(e) {
                this.item_index = e._props.index;
                this.IsDetail = false
            },
            ShowMyMeeting(e) {
                this.item_index = e._props.index;
                this.IsDetail = false
            },
            ShowMyPatient(e) {
                this.item_index = e._props.index;
                this.IsDetail = false
            },

            //main
            //预约会诊函数
            SubmitReserveForm() {
                this.$refs.ReserveForm.validate(valid => {
                    if (valid) {
                        this.$message.success("预约成功");
                        this.input = {
                            MID: this.$root.MID,
                            PID:this.ReserveForm.PID,
                            StartTime: this.ReserveForm.StartTime,
                            EndTime: this.ReserveForm.EndTime
                        };
                        this.MeetingList.push(this.input);
                        this.ReserveForm = {ID: '', PID:'',StartTime: '', EndTime: ''};
                        this.$root.MID++;
                    } else {
                        this.$message.error("非法内容");
                    }

                });
            },
            ResetForm() {
                this.$refs.ReserveForm.resetFields();
            },

            //我的会诊页函数
            //格式化时间
            formatDate(row, column) {
                // 获取单元格数据
                let data = row[column.property];
                if (data === '') {
                    return '';
                } else {
                    let dt = new Date(data);
                    return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                }
            },
            DeleteItem(index, rows) {
                this.$confirm('是否删除该条会诊', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        options:rows.splice(index, 1)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //加入会诊
            JoinMeeting(index, rows){

            },

            //我的病人页函数
            ShowDetail(){
                this.IsDetail=true;
            },
            ShowAll(){
                this.IsDetail=false;
            },

            _isMobile() {
                return navigator.userAgent.match(
                    /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
                );
            },
            //加入会诊页函数
            SubmitMeetLoginForm() {
                this.$refs.LoginMeetFormRef.validate(valid=>{
                    if(valid) {
                        console.log(this.LoginMeetForm.username);
                        console.log(this.LoginMeetForm.mid);
                        let name = document.getElementById('name').value;
                        let room = document.getElementById('roomName').value;
                        this.$root.MeetingMessage={
                            id: 'joinRoom',
                            name: name,
                            room: room,
                        };
                        console.log(this.$root.MeetingMessage);
                        // this.$router.push('/Meeting');
                        if (this._isMobile()) {
                            // 手机端
                            this.$router.push("/MobileMeeting");
                        } else {
                            // pc端
                            this.$router.replace("/Meeting");
                        }
                    }else{
                        this.$message.error("非法内容");
                    }

                });
            },

        },
        mounted() {
        }
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
    .inner{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    .menu_box{
        box-sizing: border-box;
        background-color: #36cd93;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        text-align: center;
    }
    .el-main{
        display: flex;
        height: 100%;
        width: 100%;
        background-color: #c3ffea;
    }

    /*我的会议与我的病人*/
    .MTable_container{
        width: 100%;
    }
    .PTable_container{
        width: 100%;
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
