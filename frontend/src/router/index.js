import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// Auth views
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
// Admin views
import PanelAdmin from "@/views/PanelAdmin.vue";
// User views
import Dashboard from "@/views/user/Dashboard.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import UpdateUser from "@/views/user/UpdateUser.vue";
// Items views
import ItemsList from "@/views/items/ItemsList.vue";
import ShowItem from "@/views/items/ShowItem.vue";
import AddItem from "@/views/items/AddItem.vue";
import UpdateItem from "@/views/items/UpdateItem.vue";
// Messages views
import MessagesList from "@/views/messages/MessagesList.vue";
import ShowMessage from "@/views/messages/ShowMessage.vue";
import AddMessage from "@/views/messages/AddMessage.vue";
import UpdateMessage from "@/views/messages/UpdateMessage.vue";
// Medias views
import MediasList from "@/views/medias/MediasList.vue";
import ShowMedia from "@/views/medias/ShowMedia.vue";
import AddMedia from "@/views/medias/AddMedia.vue";
import UpdateMedia from "@/views/medias/UpdateMedia.vue";

Vue.use(VueRouter);

// middleware pour ne pas acceder au page sans authentification
const guard = (to, from, next) => {
  if (!store.getters["auth/authentificated"]) {
    return next({
      name: "login"
    });
  }
  next();
};

const routes = [
  // Auth routes
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
  // Admin routes
  {
    path: "/panel-admin",
    name: "panelAdmin",
    component: PanelAdmin
  },
  // User routes
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
  {
    path: "/mon-profil/update",
    name: "updateUser",
    component: UpdateUser,
    beforeEnter: guard
  },
  // Items routes
  {
    path: "/marketplace",
    name: "itemsList",
    component: ItemsList,
    beforeEnter: guard
  },
  {
    path: "/marketplace/:itemId",
    name: "showItem",
    component: ShowItem,
    props: true,
    beforeEnter: guard
  },
  {
    path: "/marketplace/new",
    name: "addItem",
    component: AddItem,
    beforeEnter: guard
  },
  {
    path: "/marketplace/update/:itemId",
    name: "updateItem",
    component: UpdateItem,
    beforeEnter: guard
  },
  // Medias routes
  {
    path: "/medias",
    name: "mediasList",
    component: MediasList,
    beforeEnter: guard
  },
  {
    path: "/medias/:mediaId",
    name: "showMedia",
    component: ShowMedia,
    beforeEnter: guard
  },
  {
    path: "/medias/new",
    name: "addMedia",
    component: AddMedia,
    beforeEnter: guard
  },
  {
    path: "/medias/update/:mediaId",
    name: "updateMedia",
    component: UpdateMedia,
    beforeEnter: guard
  },
  // Messages routes
  {
    path: "/messages",
    name: "messagesList",
    component: MessagesList,
    beforeEnter: guard
  },
  {
    path: "/messages/:messageId",
    name: "showMessage",
    component: ShowMessage,
    beforeEnter: guard
  },
  {
    path: "/messages/new",
    name: "addMessage",
    component: AddMessage,
    beforeEnter: guard
  },
  {
    path: "/messages/update/:messageId",
    name: "updateMessage",
    component: UpdateMessage,
    beforeEnter: guard
  },
  // si aucune correspondance : retour dashboard
  { path: "*", redirect: "/dashboard" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
