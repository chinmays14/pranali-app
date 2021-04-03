<template>
  <ion-img :src="loadedMemory.image" :alt="loadedMemory.title"></ion-img>
  <h2 class="ion-text-center">{{ loadedMemory.title }}</h2>
  <p class="ion-text-center">{{ loadedMemory.description }}</p>
</template>
<script>
import { IonImg } from "@ionic/vue";
export default {
  props: ["loadedMemory"],
  components: {
    IonImg,
  },
};
</script>