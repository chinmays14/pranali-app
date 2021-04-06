<template>
  <ion-page>
    <!-- <ion-header :translucent="true">
      <ion-toolbar class="ion-text-center">
        <ion-title>Pranali App</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="login-grid">
        <ion-img :src="'/assets/img/pranali.png'"> </ion-img>

        <ion-card>
          <ion-card-content>
            <form class="ion-padding" @submit.prevent="doLogin">
              <ion-list>
                <ion-item>
                  <ion-label position="stacked">Email</ion-label>
                  <ion-input
                    type="text"
                    v-model="credentials.email"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Password</ion-label>
                  <ion-input
                    type="password"
                    v-model="credentials.password"
                  ></ion-input>
                </ion-item>
                <!-- <ion-button @click="doLogin()">Login</ion-button> -->
              </ion-list>
              <ion-button expand="full" type="submit"> Login </ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import {
  IonContent,
  // IonHeader,
  IonPage,
  // IonTitle,
  // IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonCard,
  IonCardContent,
  IonImg,
} from "@ionic/vue";
import store from "../store/index";

export default {
  name: "LoginPage",
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonTitle,
    // IonToolbar,
    IonButton,
    IonInput,
    IonLabel,
    IonCard,
    IonCardContent,
    IonImg,
  },
  data() {
    return {
      credentials: { email: "", password: "" },
    };
  },
  methods: {
    /**
     * call the login method in store using data from form, if successful
     * then goto the default route, if error, display aler
     */
    async doLogin() {
      try {
        await store.dispatch("authentication/login", { ...this.credentials });
        this.$router.replace("/");
        return null;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.login-grid {
  display: grid;
  margin: 1rem 0 0;
  grid-template-rows: .75fr 1fr;
  justify-content: center;
  align-items: center;
}
</style>