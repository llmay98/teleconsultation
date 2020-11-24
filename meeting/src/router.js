import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "./components/Login";
import Home from "./components/Home";
import Mine from "./components/Mine";
import Meeting from "./components/Meeting";
import Register from "./components/Register";
import Test from "./components/Test";
import MobileMeeting from "./components/MobileMeeting";
import MobileHome from "./components/MobileHome";


Vue.use(VueRouter);

const routes = [
  {path:'/', redirect:'/home'},
  {path:'/login', component:Login},
  {path:'/home',component:Home},
  {path:'/home/mine',component:Mine},
  {path:'/meeting',component:Meeting},
  {path:'/register',component:Register},
  {path:'/test',component:Test},
  {path:'/mobilemeeting',component:MobileMeeting},
  {path:'/mobilehome',component:MobileHome}
];

const router = new VueRouter({
  routes
});

//挂载路由导航保卫，存在token流方可访问网页
// router.beforeEach((to,from,next)=>{
//   if(to.path='/login') return next();
//   const tokenStr=window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   else return next()
// }


export default router
