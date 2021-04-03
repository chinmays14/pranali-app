<template>
  <base-layout page-title="Rotaract Memories">
    <template v-slot:actions-end>
      <ion-button router-link="/memories/add">
        <ion-icon slot="icon-only" :icon="addCircleOutline"> </ion-icon>
      </ion-button>
    </template>
    <memories-list :memories="memories"></memories-list>
  </base-layout>
</template>
<script>
import MemoriesList from "../components/memories/MemoriesList";
import { IonButton, IonIcon } from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
export default {
  components: {
    MemoriesList,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      addCircleOutline,
    };
  },
  computed: {
    memories() {
      return this.$store.getters.memories;
    },
  },
};
</script>
