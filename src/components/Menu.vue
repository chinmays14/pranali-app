<template >
  <ion-menu
    content-id="main-content"
    type="overlay"
    @ionWillOpen="handleMenuWillOpen"
    :disabled="!showMenu"
  >
    <ion-content>
      <ion-list id="inbox-list">
        <ion-item lines="none">
          <ion-thumbnail>
            <ion-img :src="'assets/img/pranali.png'"> </ion-img>
          </ion-thumbnail>
          <ion-list-header class="menu-title">{{
            currentUser?.email
          }}</ion-list-header>
        </ion-item>
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
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonFooter,
  IonButton,
  IonImg,
  IonThumbnail,
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
} from "ionicons/icons";
import store from "../store";

/**
 * the list of paths and titles for the menu items
 */
const appPages = [
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
    title: "Calendar",
    url: "/calendar",
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
  },
  {
    title: "Reporting",
    url: "/reporting",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
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
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonFooter,
    IonButton,
    IonImg,
    IonThumbnail,
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
    /**
     * connected to the menu ionWillOpen event.
     *
     * this will be called to check the path that is set in the route.
     * then loop through the predefined paths in the appPages property
     * to see if there is a match and if so then set that as the
     * selectedIndex
     *
     * the selectedIndex is used to set the styling so you can see
     * the highlighted menu item
     */
    handleMenuWillOpen() {
      const route = useRoute();
      const path = route?.path.split("/")[1];
      if (path !== undefined) {
        this.selectedIndex = appPages.findIndex(
          (page) => page.title.toLowerCase() === path.toLowerCase()
        );
      }
    },
    async doLogout() {
      await store.dispatch("authentication/logout", {});
      this.$router.replace("/login");
    },
  },
  data() {
    return {
      selectedIndex: 0,
      appPages,
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
    };
  },
};
</script>

<style  scoped>
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
</style>