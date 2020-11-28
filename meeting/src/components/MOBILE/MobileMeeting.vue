<template>
    <div style="height: 100%;display: flex;flex-direction: column">
        <div class="room">
            <div id="room" style="width: 100%;height: 100%">
                <h2 id="room-header"></h2>
                <div id="participants"></div>
            </div>
            <div style="position: absolute;top: 42%;left:40%">
                <el-popover trigger="click" placement="top" width="160" :v-model="visible1">
                    <el-form>
                        <el-form-item label="病人ID" required>
                            <el-select v-model="P_Res" placeholder="请选择病人ID" >
                                <el-option
                                        v-for="item in P_Info"
                                        :key="item.PID"
                                        :label="item.PID"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="display:flex;flex-direction:column;align-items: center">
                            <el-button size="mini" type="success" @click="ShowDoc">confirm</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" type="primary" icon="el-icon-document" circle @click="visible1=!visible1"></el-button>
                    <el-button slot="reference" type="danger" icon="el-icon-switch-button" circle @click="Exit"></el-button>
                </el-popover>
            </div>
        </div>
        <div id="pic" style="position:absolute;top:50%; width:100%; height: 50%">
            <div v-show="IsShowPic" id="OpenSeaDragon" style="width:100%; height:100%"></div>
            <div v-show="!IsShowPic" style="width:100%; height:100%;display:flex;align-items: center;justify-content: center">
                <h1>现在无图片展示</h1>
            </div>
            <div style="position: absolute;bottom: 10px;left: 40%">
                <el-popover trigger="click" placement="top" width="160" :v-model="visible">
                    <el-form>
                        <el-form-item label="切片名" required>
                            <el-select v-model="filename" placeholder="请选择切片名" >
                                <el-option
                                        v-for="item in URL_List"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="display:flex;flex-direction:column;justify-content: center">
                            <el-button size="mini" type="success" @click="ShowPic">confirm</el-button>
                            <el-button size="mini" type="danger" @click="ClosePic">close</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" type="primary" icon="el-icon-picture-outline" circle @click="visible=!visible"></el-button>
                    <el-button slot="reference" :type="IsHost.type" icon="el-icon-thumb" circle @click="ControlE"></el-button>
                </el-popover>
            </div>
        </div>
        <el-drawer
                :visible.sync="OpenDoc"
                direction='btt'
                size="100%"
        >
            <span style="display: flex;justify-content: center">
                <span style="position: absolute;top: 5px;font-weight: bold;font-size: 30px">病人病历</span>
            </span>
            <span style="display: flex;flex-direction: column">
                <img style="width: 50%;height: 50%" src="../../assets/logo.jpg" alt=""/>
                <span style="display: flex;flex-direction: column">
                    <span style="font-size: larger;font-weight: bold">ID：{{P_Res.PID}}</span>
                    <span style="font-size: larger;font-weight: bold">姓名：{{P_Res.name}}</span>
                    <span style="font-size: larger;font-weight: bold">性别：{{P_Res.sex}}</span>
                    <span style="font-size: larger;font-weight: bold">病症：{{P_Res.ache}}</span>
                </span>
            </span>
        </el-drawer>
    </div>
</template>

<script>
    import OpenSeadragon from "../../assets/openseadragon"
    import * as kurentoUtils from "kurento-utils";
    export default {
        name: "MobileMeeting",
        data(){
            return{
                visible:false,
                visible1:false,
                IsMicro:'info',
                IsVedio:'info',
                IsShowPic:false,
                OpenDoc:false,
                P_Res:'',
                P_Info:[{PID:'000001',name:'mm',sex:'male',ache:'headache'}],//从服务器端传入？
                wss:'',
                participants : {},
                name:this.$root.MeetingMessage.name,
                room:this.$root.MeetingMessage.name,
                Participant:'',
                viewer:'',
                port:'',
                filename:'',
                URL_List:[],
                IsHost:{
                    type:'info',
                    status:false
                },
                IfCan:true,

            };
        },
        methods:{
            ShowDoc(){
                this.OpenDoc=true
            },

            ControlE(){
                let that=this;
                if(this.IfCan===true){
                    if(this.IsHost.status === false){
                        this.IsHost.type='success';
                        this.IsHost.status=true;
                        let msg={
                            id:"OnControl",
                            name:that.name
                        };
                        this.sendMessage(msg);
                        this.$message.success('成功操控画面');
                    }
                    else{
                        this.IsHost.type='info';
                        this.IsHost.status=false;
                        let msg={
                            id:"OffControl",
                            name:that.name
                        };
                        this.sendMessage(msg);
                        this.$message('解除控制');
                    }
                }
                else{
                    this.$message.error('已经有人控制画面操控权');
                }
            },

            OffCan(){
                this.IfCan=false;
            },

            OnCan(){
                this.IfCan=true;
            },

            ShowPic(){
                if(this.IfCan===true){
                    this.IsShowPic=true;
                    let that=this;
                    this.viewer.open(that.filename);
                    let msg={
                        id:'openPic',
                        filename:that.filename
                    };
                    this.sendMessage(msg);
                }
                else{
                    this.$message.error('已经有人控制画面操控权');
                }
            },

            ClosePic(){
                this.IsShowPic=false;
                let msg={
                    id:'closePic'
                };
                this.sendMessage(msg);
            },

            //判断是否为移动端
            _isMobile() {
                return navigator.userAgent.match(
                    /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
                );
            },
            //退出会议
            Exit(){
                let that=this;
                if(this.IfCan===true){
                    let msg={
                        id:"OffControl",
                        name:that.name
                    };
                    this.sendMessage(msg);
                }
                this.sendMessage({
                    id : 'leaveRoom'
                });
                for (let key in this.participants) {
                    this.participants[key].dispose();
                }
                this.wss.close();
                console.log('exit');
                // this.$router.push('/Home');
                if (this._isMobile()) {
                    // 手机端
                    this.$router.push("/mobilehome");
                } else {
                    // pc端
                    this.$router.push("/home");
                }
            },

            //通过websocket传递消息
            sendMessage(message) {
                const jsonMessage = JSON.stringify(message);
                console.log('Sending message: ' + jsonMessage);
                this.wss.send(jsonMessage);
            },

            //会议系列函数
            onNewParticipant(request) {
                this.receiveVideo(request.name);
            },

            receiveVideoResponse(result) {
                this.participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
                    if (error) return console.error (error);
                });
            },

            onExistingParticipants(msg) {
                const constraints = {
                    audio: true,
                    video: {
                        mandatory: {
                            maxWidth: 320,
                            maxFrameRate: 15,
                            minFrameRate: 15
                        }
                    }
                };
                console.log(this.name + " registered in room " + this.room);
                const participant = new this.Participant(this.name);
                this.participants[this.name] = participant;
                const video = participant.getVideoElement();

                const options = {
                    localVideo: video,
                    mediaConstraints: constraints,
                    onicecandidate: participant.onIceCandidate.bind(participant)
                };
                participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
                    function (error) {
                        if(error) {
                            return console.error(error);
                        }
                        participant.rtcPeer.generateOffer (participant.OfferToReceiveVideo.bind(participant));
                    });
                msg.data.forEach(this.receiveVideo);
            },

            receiveVideo(sender) {
                const participant = new this.Participant(sender);
                this.participants[sender] = participant;

                const video = participant.getVideoElement();

                const options = {
                    remoteVideo: video,
                    onicecandidate: participant.onIceCandidate.bind(participant)
                };
                participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
                    function (error) {
                        if(error) {
                            return console.error(error);
                        }
                        this.generateOffer (participant.OfferToReceiveVideo.bind(participant));
                    });
            },

            onParticipantLeft(request) {
                console.log('Participant ' + request.name + ' left');
                const participant = this.participants[request.name];
                participant.dispose();
                delete(this.participants[request.name]);
            },

            openP(msg){
                let filename=msg.filename;
                this.viewer.open(filename);
                this.IsShowPic=true;
            },

            closeP(){
                this.IsShowPic=false;
            },

            changePort(msg){
                let newport = msg.port;
                console.log(msg.port);
                let old = this.viewer.viewport.getBounds(true);
                old.x = newport.x;
                old.y = newport.y;
                old.height = newport.height;
                old.width = newport.width;
                old.degrees = newport.degrees;
                this.viewer.viewport.fitBounds(old, true);
            },

            open(){
                console.log("success!");
                this.sendMessage(this.$root.MeetingMessage);
                document.getElementById('room-header').innerText = 'ROOM ' + this.$root.MeetingMessage.room;
            },

            //websocket-onmessage
            getMessage(message){
                let parsedMessage = JSON.parse(message.data);
                console.info('Received message: ' + message.data);
                switch (parsedMessage.id) {
                    case 'existingParticipants':
                        this.onExistingParticipants(parsedMessage);
                        break;
                    case 'newParticipantArrived':
                        this.onNewParticipant(parsedMessage);
                        break;
                    case 'participantLeft':
                        this.onParticipantLeft(parsedMessage);
                        break;
                    case 'receiveVideoAnswer':
                        this.receiveVideoResponse(parsedMessage);
                        break;
                    case 'iceCandidate':
                        this.participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
                            if (error) {
                                console.error("Error adding candidate: " + error);
                            }
                        });
                        break;
                    case 'openPic':
                        this.openP(parsedMessage);
                        break;
                    case 'closePic':
                        this.closeP();
                        break;
                    case 'changePort':
                        this.changePort(parsedMessage);
                        break;
                    case 'OnControl':
                        this.OffCan();
                        break;
                    case 'OffControl':
                        this.OnCan();
                        break;
                    default:
                        console.error('Unrecognized message', parsedMessage);
                }
            }
        },

        mounted() {
            this.wss = new WebSocket('wss://pk.zhanghaichuan.com:8001/groupcall');

            this.wss.onopen = this.open;
            this.wss.onmessage = this.getMessage;
            this.wss.onclose = function () {
                console.log("close websocket success!")
            };

            window.onbeforeunload = function() {
                this.wss.close();
            };

            window.addEventListener('load', () => {
                if (this.$route.path !== '/Home') {
                    this.$router.replace('/Home')
                }
            });

            const that=this;
            that.Participant = function(name) {
                const PARTICIPANT_MAIN_CLASS = 'participant main';
                const PARTICIPANT_CLASS = 'participant';
                const container = document.createElement('div');
                // container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
                container.className=PARTICIPANT_CLASS;
                container.id = name;
                const span = document.createElement('span');
                const video = document.createElement('video');

                container.appendChild(video);
                container.appendChild(span);
                container.onclick = switchContainerClass;
                document.getElementById('participants').appendChild(container);

                span.appendChild(document.createTextNode(name));
                video.id = 'video-' + name;
                video.autoplay = true;
                video.controls = false;

                this.getElement = function() {
                    return container;
                };

                this.getVideoElement = function() {
                    return video;
                };

                function switchContainerClass() {
                    if (container.className === PARTICIPANT_CLASS) {
                        const elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
                        elements.forEach(function(item) {
                            item.className = PARTICIPANT_CLASS;
                        });

                        container.className = PARTICIPANT_MAIN_CLASS;
                    } else {
                        container.className = PARTICIPANT_CLASS;
                    }
                }

                function isPresentMainParticipant() {
                    return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length !== 0);
                }

                function sendMessage(message) {
                    const jsonMessage = JSON.stringify(message);
                    console.log('Sending message: ' + jsonMessage);
                    that.wss.send(jsonMessage);
                }

                this.OfferToReceiveVideo = function(error, offerSdp){
                    if (error) return console.error(error);
                    console.log('Invoking SDP offer callback function');
                    const msg = {
                        id: "receiveVideoFrom",
                        sender: name,
                        sdpOffer: offerSdp
                    };
                    sendMessage(msg);
                };

                this.onIceCandidate = function (candidate, wp) {
                    console.log("Local candidate" + JSON.stringify(candidate));
                    const message = {
                        id: 'onIceCandidate',
                        candidate: candidate,
                        name: name
                    };
                    sendMessage(message)
                };

                Object.defineProperty(this, 'rtcPeer', { writable: true});
                this.dispose = function() {
                    console.log('Disposing participant'+name);
                    this.rtcPeer.dispose();
                    container.parentNode.removeChild(container);
                };
            };

            that.viewer = OpenSeadragon({
                id: "OpenSeaDragon",
                prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
                panHorizontal: true,     //水平允许拖拽
                panVertical: true,         //竖直允许拖拽
                constrainDuringPan: false, //是否限制拖拽出允许显示范围
                wrapHorizontal: false,      //在水平方向会连续显示
                wrapVertical: false,          //垂直方向连续显示
                visibilityRatio: 0.3,    //图片在显示框view中被限制的最小百分百
                minPixelRatio: 0.5,          //最小像素比
                // minZoomImageRatio:0.2,    //最小允许缩小比例
                // maxZoomPixelRatio:2,  //最大允许放大比例
                defaultZoomLevel: 0,   //默认显示的放大倍数
                // minZoomLevel:null,      //最小放大倍数
                // maxZoomLevel:null,      //最大放大倍数
                showNavigator: true,
                navigatorPosition: "BOTTOM_RIGHT",
            });

            that.viewer.addHandler('animation-finish',function () {
                let my_port=that.viewer.viewport.getBounds(true);
                let message={
                    id: 'changePort',
                    port:my_port,
                };
                if(that.IsShowPic===true&&that.IsHost.status===true) {
                    that.sendMessage(message);
                }
            })
        },

        created() {
            let that=this;
            this.$axios.get("https://pk.zhanghaichuan.com/dzi_list_data?page_no=1&item_per_page=20")
                .then(response =>{
                    let file_list=response.data;
                    for(let i=0;i<file_list.length;i++){
                        let info = {value:file_list[i][3],label:file_list[i][0]};
                        that.URL_List.push(info);
                    }
                })
        }
    }
</script>

<style>
    .room{
        display:flex;
        flex-wrap: wrap;
        width: 100%;
        height: 50%;
        background-color: #c3ffea;
    }

    .participant {
        background-color: #36cd93;
        border-radius: 4px;
        margin-left: 5px;
        margin-right: 5px;
        width: 20%;
        text-align: center;
        float: left;
        padding: 5px;
        -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
        /*Transition*/
        -webkit-transition: all 0.3s linear;
        -moz-transition: all 0.3s linear;
        -o-transition: all 0.3s linear;
        transition: all 0.3s linear;
    }

    .participant:before {
        content: '';
        position: absolute;
        top: -8px;
        right: -8px;
        bottom: -8px;
        left: -8px;
        z-index: -1;
        background: rgb(215, 215, 215);
        border-radius: 4px;
    }

    .participant:hover {
        opacity: 1;
        background-color: orangered;
        -webkit-transition: all 0.5s linear;
        transition: all 0.5s linear;
    }

    .participant video, .participant.main video {
        width: 100%;
        height: auto;
    }

    .participant span {
        color: PapayaWhip;
    }

    .participant.main {
        width: 20%;
        height: 50%;
        margin-left: 5px;
        margin-right: 5px;
    }

    .participant.main video {
        height: auto;
    }
</style>
