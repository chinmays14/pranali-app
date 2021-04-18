<template>
  <base-layout
    :page-title="loadedMemory ? loadedMemory.title : 'Loading...'"
    pageDefaultBackLink="/memories"
  >
    <h2 v-if="!loadedMemory">Could not find the given Id</h2>
    <memory-overview v-else :loadedMemory="loadedMemory"></memory-overview>
  </base-layout>
</template>
<script>
import MemoryOverview from "../components/memories/MemoryOverview";
export default {
  components: {
    MemoryOverview,
  },
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
