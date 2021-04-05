<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <Menu />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet,IonSplitPane } from '@ionic/vue';
import Menu from "./components/Menu";

export default ({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    Menu
  }
});
</script>