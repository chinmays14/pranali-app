<template >
  <ion-menu
    content-id="main-content"
    type="overlay"
    @ionWillOpen="handleMenuWillOpen"
    :disabled="!showMenu"
  >
    <ion-content>
      <div class="menu-header-bg"></div>
      <div class="header-content">
        <img src="assets/img/rotary-wheel.png" alt="" />
        <ion-label>
          <h2>{{ currentUser?.email }}</h2>
          <p>Creator</p>
        </ion-label>
      </div>

      <!-- <ion-list id="inbox-list">
        <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
          <ion-item
            @click="selectedIndex = i"
            router-direction="root"
            :router-link="p.url"
            lines="none"
            detail="false"
            class="hydrated"
            :class="{ selected: selectedIndex === i }"
          >
            <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list> -->

      <ion-list>
        <template v-for="(mn, i) in menu" :key="i">
          <ion-item
            button
            lines="none"
            @click="toggleMenu(mn), (selectedIndex = mn.title)"
            router-direction="root"
            :router-link="mn.url"
            class="hydrated"
            :class="{ selected: selectedIndex === mn.title }"
            detail="false"
          >
            <ion-icon slot="start" :ios="mn.iosIcon" :mn="mn.mdIcon"></ion-icon>
            <ion-label>{{ mn.title }}</ion-label>
            <ion-icon
              :style="{
                transform: mn.isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }"
              v-if="mn.children && mn.children.length"
              :ios="arrowForwardCircleOutline"
              :mn="arrowForwardCircleSharp"
              slot="end"
            ></ion-icon>
          </ion-item>
          <ion-item
            class="submenu ion-padding-start"
            v-for="(ch, j) in mn.children"
            @click="selectedIndex = ch.title"
            :class="[{ selected: selectedIndex === ch.title }, mn.tag]"
            button
            lines="none"
            :key="j"
            router-direction="root"
            :router-link="ch.url"
            detail="false"
          >
            <ion-label>{{ ch.title }}</ion-label>
            <ion-icon slot="start" :ios="ch.iosIcon" :mn="ch.mdIcon"></ion-icon>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
    <ion-note class="ion-padding ion-text-center"
      >Made with
      <ion-icon
        class="icon-heart"
        :ios="heartOutline"
        :md="heartSharp"
      ></ion-icon>
      by Chinmay
    </ion-note>
    <ion-footer style="text-align: center">
      <ion-button @click="doLogout">LOGOUT</ion-button>
    </ion-footer>
  </ion-menu>
</template>

<script>
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonNote,
  IonFooter,
  IonButton,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  homeOutline,
  homeSharp,
  personOutline,
  personSharp,
  calendarOutline,
  calendarSharp,
  informationCircleOutline,
  informationCircleSharp,
  arrowForwardCircleOutline,
  arrowForwardCircleSharp,
  constructOutline,
  constructSharp,
  bookOutline,
  bookSharp,
  cogOutline,
  cogSharp,
  gridOutline,
  gridSharp,
  statsChartOutline,
  statsChartSharp,
  shareSocialOutline,
  shareSocialSharp,
  personAddOutline,
  personAddSharp,
  trophyOutline,
  trophySharp,
  peopleOutline,
  peopleSharp,
  personCircleOutline,
  personCircleSharp,
  checkmarkDoneOutline,
  checkmarkDoneSharp,
  cashOutline,
  cashSharp,
  receiptOutline,
  receiptSharp,
  readerOutline,
  readerSharp,
  ribbonOutline,
  ribbonSharp,
  todayOutline,
  todaySharp,
  appsOutline,
  appsSharp,
  fileTrayFullOutline,
  fileTrayFullSharp,
} from "ionicons/icons";
import store from "../store";
import { createAnimation } from "@ionic/vue";

const menu = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
  {
    title: "Club Admin",
    // url: "/club-admin",
    iosIcon: appsOutline,
    mdIcon: appsSharp,
    isOpen: false,
    tag: "club-admin",
    children: [
      {
        title: "Club",
        url: "/club-admin/club",
        iosIcon: peopleOutline,
        mdIcon: peopleSharp,
      },
      {
        title: "Member",
        url: "/club-admin/member",
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp,
      },
      {
        title: "AARA Nominations",
        url: "/club-admin/aara-nom",
        iosIcon: trophyOutline,
        mdIcon: trophySharp,
      },
      {
        title: "OCV",
        url: "/club-admin/ocv",
        iosIcon: checkmarkDoneOutline,
        mdIcon: checkmarkDoneSharp,
      },
      {
        title: "Pay Dues Online",
        url: "/club-admin/pay-dues",
        iosIcon: cashOutline,
        mdIcon: cashSharp,
      },
      {
        title: "Receipt",
        url: "/club-admin/receipt",
        iosIcon: receiptOutline,
        mdIcon: receiptSharp,
      },
    ],
  },
  {
    title: "Reporting",
    // url: "/reporting",
    iosIcon: fileTrayFullOutline,
    mdIcon: fileTrayFullSharp,
    isOpen: false,
    tag: "reporting",
    children: [
      {
        title: "Project",
        url: "/reporting/project",
        iosIcon: readerOutline,
        mdIcon: readerSharp,
      },
      {
        title: "Meeting",
        url: "/reporting/meeting",
        iosIcon: todayOutline,
        mdIcon: todaySharp,
      },
      {
        title: "Ambassadorial Report",
        url: "/reporting/ambassadorial",
        iosIcon: ribbonOutline,
        mdIcon: ribbonSharp,
      },
    ],
  },
  {
    title: "Tools",
    iosIcon: constructOutline,
    mdIcon: constructSharp,
    isOpen: false,
    tag: "tools",
    children: [
      {
        title: "E-Directory",
        url: "/tool/e-directory",
        iosIcon: bookOutline,
        mdIcon: bookSharp,
      },
      {
        title: "Insight Engine",
        url: "/tool/insight-engine",
        iosIcon: cogOutline,
        mdIcon: cogSharp,
      },
      {
        title: "Dashboard",
        url: "/tool/dashboard",
        iosIcon: gridOutline,
        mdIcon: gridSharp,
      },
      {
        title: "Event Calendar",
        url: "/tool/calendar",
        iosIcon: calendarOutline,
        mdIcon: calendarSharp,
      },
      {
        title: "Leaderboard",
        url: "/tool/leaderboard",
        iosIcon: statsChartOutline,
        mdIcon: statsChartSharp,
      },
      {
        title: "Social Wall",
        url: "/tool/social-wall",
        iosIcon: shareSocialOutline,
        mdIcon: shareSocialSharp,
      },
      {
        title: "Pranali user Registration",
        url: "/tool/pranali-user-registration",
        iosIcon: personAddOutline,
        mdIcon: personAddSharp,
      },
    ],
  },
  {
    title: "About",
    url: "/about",
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];

export default {
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonNote,
    IonFooter,
    IonButton,
  },
  computed: {
    /**
     * called to determine if the menu should be shown.
     *
     * we use the current route and look at the properties that are
     * set in the router; the route meta has a flag "hideMenu" to
     * indicate if the menu should be should be shown or not
     */
    showMenu() {
      const route = useRoute();
      return route.meta?.hideMenu !== true;
    },
    currentUser() {
      return store.getters["authentication/currentUser"];
    },
  },
  methods: {
    handleMenuWillOpen() {
      const route = useRoute();
      const path = route?.path.split("/")[1];
      if (path !== undefined) {
        this.selectedIndex = menu.findIndex(
          (page) => page.title.toLowerCase() === path.toLowerCase()
        );
      }
    },
    async doLogout() {
      await store.dispatch("authentication/logout", {});
      this.$router.replace("/login");
    },
    toggleMenu: function (menu) {
      const from = menu.isOpen ? "50px" : "0px";
      const to = menu.isOpen ? "0px" : "50px";

      const fromRotate = menu.isOpen ? "rotate(90deg)" : "rotate(0deg)";
      const toRotate = menu.isOpen ? "rotate(0deg)" : "rotate(90deg)";

      const animation = createAnimation()
        .addElement(document.querySelectorAll("." + menu.tag))
        .duration(300)
        .fromTo("height", from, to);
      animation.play();

      const animation2 = createAnimation()
        .addElement(document.querySelectorAll(".chevron_" + menu.tag))
        .duration(300)
        .fromTo("transform", fromRotate, toRotate);

      animation2.play();

      menu.isOpen = !menu.isOpen;
    },
  },
  data() {
    return {
      selectedIndex: 0,
      menu,
      archiveOutline,
      archiveSharp,
      bookmarkOutline,
      bookmarkSharp,
      heartOutline,
      heartSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      homeOutline,
      homeSharp,
      personOutline,
      personSharp,
      calendarOutline,
      calendarSharp,
      informationCircleOutline,
      informationCircleSharp,
      arrowForwardCircleOutline,
      arrowForwardCircleSharp,
      constructOutline,
      constructSharp,
      bookOutline,
      bookSharp,
      cogOutline,
      cogSharp,
      gridOutline,
      gridSharp,
      statsChartOutline,
      statsChartSharp,
      shareSocialOutline,
      shareSocialSharp,
      personAddOutline,
      personAddSharp,
      trophyOutline,
      trophySharp,
      peopleOutline,
      peopleSharp,
      personCircleOutline,
      personCircleSharp,
      checkmarkDoneOutline,
      checkmarkDoneSharp,
      cashOutline,
      cashSharp,
      receiptOutline,
      receiptSharp,
      readerOutline,
      readerSharp,
      ribbonOutline,
      ribbonSharp,
      todayOutline,
      todaySharp,
      appsOutline,
      appsSharp,
      fileTrayFullOutline,
      fileTrayFullSharp,
    };
  },
};
</script>

<style scoped>
ion-item.selected {
  --color: var(--ion-color-primary);
}
ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.icon-heart {
  vertical-align: middle;
}
.menu-title {
  font-size: 20px;
}

.menu-header-bg {
  height: 180px;
  width: 350px;
  background: #ed576b;
  background: linear-gradient(90deg, #ed576b 0%, #cf3c4f 100%);
  box-shadow: 0px 1px 10px rgba(98, 140, 255, 0.5);
  transform: rotate(-15deg);
  border-radius: 10px 10px 10px 50px;
  margin-left: -18px;
  margin-top: -50px;
  margin-bottom: 40px;
}
ion-item.submenu {
  height: 0px;
}
</style>
<style lang="scss" scoped>
.header-content {
  position: absolute;
  top: 30px;
  left: 15px;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
    padding: 5px;
    margin-right: 14px;
    // border: 7px solid #ed576b;
  }

  h2 {
    font-weight: 300;
    color: #fff;
  }
  p {
    font-size: 12px;
    color: #e4e4e4;
    font-weight: 100;
    letter-spacing: 0.4px;
  }
}
</style>