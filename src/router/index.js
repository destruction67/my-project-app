import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "@/views/Login";

import Main from "@/views/Main";
import Home from "@/views/main/Home";

import UserList from "@/views/masterlist/User";

import {TOKEN} from "@/config/constants.config";

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]


const login = {
  path: '/',
  name: 'Login',
  component: Login
}

const routes = [
  login,
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth: true,
    },
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },

      /** view user records **/
      {
        path: '/user/list',
        name: 'UserList',
        component: UserList,
      },




    ]

  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


// adding meta for the authenticated routes
router.beforeEach(function(to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //AUTH
    if (localStorage.getItem(TOKEN.MY_APP) != null) {
      next();
    }
    else {
      next({name:'Login'});
    }

  } else {

    if(!localStorage.getItem(TOKEN.MY_APP) ){
      next();
    }
    else{
      next({name:'Home'});
    }

  }
});

export default router
