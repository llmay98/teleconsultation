<template>
    <div class="info_container">
        <div class="logo_info_box">
            <!-- logo -->
            <div class="logo_box" @click="BackHome">
                <img src="../../assets/logo.jpg" alt="" :title="'返回首页'">
            </div>
            <!-- info form -->
            <el-form ref="InfoFormRef" :rules="InfoFormRules" class="form_box" :model="InfoForm">
                <el-form-item label="ID" prop="ID">
                    <el-input v-if="!edit" disabled v-model="InfoForm.ID" prefix-icon="el-icon-bank-card"></el-input>
                    <el-input v-else v-model="InfoForm.ID" prefix-icon="el-icon-bank-card"></el-input>
                </el-form-item>
                <el-form-item label="name" prop="name">
                    <el-input v-if="!edit" disabled v-model="InfoForm.name" prefix-icon="el-icon-user"></el-input>
                    <el-input v-else v-model="InfoForm.name" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="department" prop="department">
                    <el-select v-if="!edit" disabled v-model="InfoForm.department"></el-select>
                    <el-select v-else v-model="InfoForm.department" placeholder="请选择科室" >
                        <el-option
                                v-for="item in DepList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="position" prop="position">
                    <el-select v-if="!edit" disabled v-model="InfoForm.position"></el-select>
                    <el-select v-else v-model="InfoForm.position" placeholder="请选择职位" >
                        <el-option
                                v-for="item in PosList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="btn_box">
                    <el-button v-if="!edit" type="primary" @click="EditInfo">edit</el-button>
                    <el-button v-else type="default" @click="SaveEdit">save</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Mine",
        data(){
            return{
                edit:false,
                InfoForm: {
                    ID:'2173',
                    name: 'may',
                    department: '耳鼻喉科',
                    position:'内科'
                },
                InfoFormRules:{
                    ID:[{required:true,message:"please input your ID",trigger:"blur"}],
                    name:[{required:true,message:"please input name",trigger:"blur"}],
                    department:[{required:true,message:"please choose department",trigger:"blur"}],
                    position:[{required:true,message:"please choose position",trigger:"blur"}]
                },
                DepList:[
                    {value: '耳鼻喉科', label: '耳鼻喉科'},
                    {value: '外科', label: '外科'},
                    {value: '内科', label: '内科'},
                    {value: '眼科', label: '眼科'},
                    {value: '皮肤科', label: '皮肤科'}
                    ],
                PosList:[
                    {value: '院长', label: '院长'},
                    {value: '主任', label: '主任'},
                    {value: '副主任', label: '副主任'},
                    {value: '普通医生', label: '普通医生'},
                    {value: '实习医生', label: '实习医生'}
                    ]
            };
        },
        methods:{
            BackHome(){
                this.$router.push('/Home');
            },
            EditInfo(){
                this.edit=true
            },
            SaveEdit(){
                this.$refs.InfoFormRef.validate(valid=>{
                    if(valid) {
                        this.$message.success("修改成功");
                        this.edit=false
                    }else{
                        this.$message.error("非法内容");
                    }

                });
            }
        }
    }
</script>

<style scoped>
    .info_container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: aquamarine;
    }

    .logo_info_box{
        width:500px;
        border-radius: 5px;
        background-color: azure;
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .text_box{
        width: 100%;
        height: 100%;
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
