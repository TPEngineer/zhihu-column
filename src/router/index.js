import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../components/Layout.vue";
import store from "../store";
const routes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const whiteList = ["/login", "/home"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token == null) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next("/login");
    }
  } else {
    store.dispatch("fetchUserDetail");
    next();
  }
});

export default router;
