import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import UserProfile from "../views/UserProfile.vue";
import store from "../store";

Vue.use(VueRouter);

// middleware pour ne pas acceder au page sans authentification
const guard = (to, from, next) => {
  if (!store.getters['auth/authentificated']) {
    return next({
      name: 'login'
    })
  }
  next()
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/connexion",
    name: "login",
    component: Login
  },
  {
    path: "/inscription",
    name: "register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: guard
  },
  {
    path: "/mon-profil",
    name: "userProfile",
    component: UserProfile,
    beforeEnter: guard
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
