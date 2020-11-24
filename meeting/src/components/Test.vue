<template>
    <div style="width: 100%;height: 100%;display: flex;flex-direction: row">
        <div id="OpenSeaDragon1" style="width:50%; height:100%"></div>
        <div id="OpenSeaDragon2" style="width:50%; height:100%"></div>
    </div>

</template>

<script>
    import OpenSeadragon from "../assets/openseadragon";

    export default {
        name: "Test",
        data(){
          return{
            viewer1:'',
            viewer2:''
          };
        },
        methods:{
        },
        mounted() {
            let that=this;
            that.viewer1 = OpenSeadragon({
                id: "OpenSeaDragon1",
                prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
                tileSources:"http://pk.zhanghaichuan.com:5000/dzi_online/Data/Original_data/94a927bf-a4a0-42ec-b67b-14277921aef8/TCGA-G7-7502-01Z-00-DX1.2ba28bc2-1b3a-415f-ba2b-26b2e76de731.svs.dzi",
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
            that.viewer2 = OpenSeadragon({
                id: "OpenSeaDragon2",
                prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
                tileSources:"http://pk.zhanghaichuan.com:5000/dzi_online/Data/Original_data/94a927bf-a4a0-42ec-b67b-14277921aef8/TCGA-G7-7502-01Z-00-DX1.2ba28bc2-1b3a-415f-ba2b-26b2e76de731.svs.dzi",
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
            that.viewer1.addHandler('animation',function () {
                let point=that.viewer1.viewport.getBounds(true);
                console.log(point);
                that.viewer2.viewport.fitBounds(point,true);
            })
        }
    }
</script>

<style scoped>

</style>
