import { createRouter, createWebHistory } from "@ionic/vue-router";
// import MemoriesPage from "../pages/MemoriesPage.vue";
import store from '../store/index';

const routes = [

  // home route
  {
    path: '',
    name: "default",
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../components/menus/Home.vue'),
    meta: { hideMenu: false, private: true }
  },
  // profile route
  {
    path: '/profile',
    component: () => import('../components/menus/Profile.vue'),
    meta: { hideMenu: false, private: true }
  },
  // club-admin routes
  {
    path: "/club-admin/club",
    component: () => import('../components/menus/ClubAdmin/Club.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/club-admin/member",
    component: () => import('../components/menus/ClubAdmin/Member.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/club-admin/aara-nom",
    component: () => import('../components/menus/ClubAdmin/AARA-Nomination.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/club-admin/ocv",
    component: () => import('../components/menus/ClubAdmin/OCV.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/club-admin/pay-dues",
    component: () => import('../components/menus/ClubAdmin/PayduesOnline.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/club-admin/receipt",
    component: () => import('../components/menus/ClubAdmin/Receipt.vue'),
    meta: { hideMenu: false, private: true },
  },
  // reporting routes
  {
    path: "/reporting/project",
    component: () => import('../components/menus/Reporting/Project.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/reporting/meeting",
    component: () => import('../components/menus/Reporting/Meeting.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/reporting/ambassadorial",
    component: () => import('../components/menus/Reporting/AmbassadorialReport.vue'),
    meta: { hideMenu: false, private: true },
  },
  // tools routes
  {
    path: "/tool/e-directory",
    component: () => import('../components/menus/Tools/E-directory.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/insight-engine",
    component: () => import('../components/menus/Tools/InsightEngine.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/dashboard",
    component: () => import('../components/menus/Tools/Dashboard.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/calendar",
    component: () => import('../components/menus/Tools/Event-Calendar.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/leaderboard",
    component: () => import('../components/menus/Tools/Leaderboard.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/social-wall",
    component: () => import('../components/menus/Tools/SocialWall.vue'),
    meta: { hideMenu: false, private: true },
  },
  {
    path: "/tool/pranali-user-registration",
    component: () => import('../components/menus/Tools/PranaliUserRegis.vue'),
    meta: { hideMenu: false, private: true },
  },
  // about route
  {
    path: '/about',
    component: () => import('../components/menus/About.vue'),
    meta: { hideMenu: false, private: true }
  },
  /*  {
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
      path: '/:id/detail',
      component: () => import('../pages/FolderDetails.vue'),
      // the meta is here for determining when to hide the sidemenu
      // it is hidden on all public pages and detail pages
      meta: { hideMenu: true, private: true }
    },
    {
      path: '/folder/:id/detail',
      component: () => import('../pages/FolderDetails.vue'),
      // the meta is here for determining when to hide the sidemenu
      // it is hidden on all public pages and detail pages
      meta: { hideMenu: true, private: true }
    },
    {
      path: '/folder/:id',
      component: () => import('../pages/Folder.vue'),
      // the meta is here for determining when to hide the sidemenu
      // it is hidden on all public pages and detail pages
      meta: { hideMenu: false, private: true }
    }, */
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
