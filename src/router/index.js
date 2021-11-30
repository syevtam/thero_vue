import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Music from "../views/Music/Index.vue";
import Books from "../views/Books/Index.vue";
import Podcasts from "../views/Podcasts/Index.vue";
import Cinema from "../views/Cinema/Index.vue";
import Series from "../views/Series/Index.vue";
import Movies from "../views/Movies/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/podcasts",
    name: "Podcasts",
    component: Podcasts,
  },
  {
    path: "/cinema",
    name: "Cinema",
    component: Cinema,
  },
  {
    path: "/series",
    name: "Series",
    component: Series,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
