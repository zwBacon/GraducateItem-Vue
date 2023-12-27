import {createRouter , createWebHashHistory} from "vue-router";


const routes = [
    // 登录注册路径
    {
        path:"/WelcomPage",
        component: import('../views/登录注册/WelcomPage.vue')
    },
    {
        path: "/SignOrLoadPage",
        component: import('../views/登录注册/SignOrLoadPage.vue')
    },
    {
        path: "/CreateAccountPage",
        component: import('../views/登录注册/CreateAccountPage.vue')
    },

//     主要功能页面
    {
        path: "/MainMeunShowPage",
       component: import('../views/主要功能页面/MainMeunShowPage.vue'),
        children:[
            {
                path:"LeftSideLineView",
                component: () => import('../components/LeftSideLineView.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.path === '/LoadPage' || to.path === '/Welcome') {
//         // 登录或者注册才可以往下进行
//         next();
//     } else {
//         // 获取 token
//         var token = localStorage.getItem('token');
//         axios({
//             method:"get",
//             url:"http://localhost:1008/LoginController/getUserFromRedis?login_token="+token
//         }).then(function (resp){
//             localStorage.setItem("username",resp.data)
//             if(resp.data !== ''){
//                 next();
//             }else{
//                 next('/LoadPage')
//             }
//         })
//     }
// })


export default router