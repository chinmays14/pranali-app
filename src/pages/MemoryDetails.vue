<template>
  <base-layout
    :page-title="loadedMemory ? loadedMemory.title : 'Loading...'"
    pageDefaultBackLink="/memories"
  >
    <h2 v-if="!loadedMemory">Could not find the given Id</h2>
    <h2 v-else>Loaded it</h2>
  </base-layout>
</template>
<script>
export default {
  data() {
    return {
      memoryId: this.$route.params.id,
    };
  },
  computed: {
    loadedMemory() {
      return this.$store.getters.memory(this.memoryId);
    },
  },
  //   watch: {
  //     $route(currnetRoute) {
  //       this.memoryId = currnetRoute.params.id;
  //     },
  //   },
};
</script>
