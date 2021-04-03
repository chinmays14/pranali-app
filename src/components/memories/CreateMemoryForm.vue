<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input type="text" required v-model="enteredTitle" />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Image Url</ion-label>
        <ion-input type="Url" required v-model="enteredImageUrl" />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Description</ion-label>
        <ion-textarea rows="5" v-model="enteredDescription" />
      </ion-item>
    </ion-list>
    <ion-button expand="full" type="submit"> Save </ion-button>
  </form>
</template>
<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
export default {
  emits: ["save-memory"],
  data() {
    return {
      enteredTitle: "",
      enteredImageUrl: "",
      enteredDescription: "",
    };
  },
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
  },
  methods: {
    submitForm() {
      const memoryData = {
        title: this.enteredTitle,
        imageUrl: this.enteredImageUrl,
        description: this.enteredDescription,
      };
      this.$emit("save-memory", memoryData);
    },
  },
};
</script>