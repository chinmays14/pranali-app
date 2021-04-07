import { createRouter, createWebHistory } from "@ionic/vue-router";
// import MemoriesPage from "../pages/MemoriesPage.vue";
import store from '../store/index';

const routes = [
//  {
//     path: "/",
//     redirect: "/memories",
//   },
//   {
//     path: "/memories",
//     component: MemoriesPage,
//   },
//   {
//     path: "/memories/:id",
//     component: () => import("../pages/MemoryDetailsPage.vue"),
//   },
//   {
//     path: "/memories/add",
//     component: () => import("../pages/AddMemoryPage.vue"),
//   },
  {
    path: '',
    name: "default",
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../components/pages/Home.vue'),
    meta: { hideMenu: false, private: true }
  },
  {
    path: '/profile',
    component: () => import('../components/pages/Profile.vue'),
    meta: { hideMenu: false, private: true }
  },
  {
    path: '/calendar',
    component: () => import('../components/pages/Calendar.vue'),
    meta: { hideMenu: false, private: true }
  },
  {
    path: '/reporting',
    component: () => import('../components/pages/Reporting.vue'),
    meta: { hideMenu: false, private: true }
  },
  {
    path: '/about',
    component: () => import('../components/pages/About.vue'),
    meta: { hideMenu: false, private: true }
  },
  {
    path: '/:id/detail',
    component: () => import('../pages/FolderDetails.vue'),
    // the meta is here for determining when to hide the sidemenu
    // it is hidden on all public pages and detail pages
    meta: { hideMenu: true, private: true }
  },
  // {
  //   path: '/folder/:id/detail',
  //   component: () => import('../pages/FolderDetails.vue'),
  //   // the meta is here for determining when to hide the sidemenu
  //   // it is hidden on all public pages and detail pages
  //   meta: { hideMenu: true, private: true }
  // },
  // {
  //   path: '/folder/:id',
  //   component: () => import('../pages/Folder.vue'),
  //   // the meta is here for determining when to hide the sidemenu
  //   // it is hidden on all public pages and detail pages
  //   meta: { hideMenu: false, private: true }
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue'),
    // the meta is here for determining when to hide the sidemenu
    // it is hidden on all public pages and detail pages
    meta: { hideMenu: true, private: false }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// this is called before each route is rendered
router.beforeEach((to, from, next) => {
  
  const isLoggedIn = store.getters['authentication/isLoggedIn'];
  // using the getters from the store to determine if user
  // is logged in or not
  if (isLoggedIn && (to.name === 'login')) {
    // if logged in and path is back to login, the redirect to
    // the default route
    next({ name: "default", replace: true });
  } else if (!isLoggedIn && (to.name !== 'login')) {
    // if not logged in and not trying to go to login route,
    // the go to login route
    next({ name: "login", replace: true });
  } else {
    // otherwise continue
    next();
  }

})

export default router;
