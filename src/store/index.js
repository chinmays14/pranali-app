import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      memories: [
        {
          id: "1",
          title: "A trip to Nepal",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Changunarayan_temple_2019.jpg/220px-Changunarayan_temple_2019.jpg",
          description: "It was an International Trip",
        },
        {
          id: "2",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Hadimba_Devi_Mandir.jpg/250px-Hadimba_Devi_Mandir.jpg",
          title: "A trip to Manali",
          description: "It was an College Trip",
        },
        {
          id: "3",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Our_lady_panjim.jpg/800px-Our_lady_panjim.jpg",
          title: "A trip to Goa",
          description: "It was an Recreational Trip",
        },
      ],
    };
  },
  getters: {
    memories(state) {
      return state.memories;
    },
    memory(state) {
      return (memoryId) => {
        return state.memories.find((memory) => memory.id === memoryId);
      };
    },
  },
  mutations: {
    addMemory(state, memoryData) {
      const newMemory = {
        id: (parseInt(state.memories[state.memories.length - 1].id) + 1).toString(),
        title: memoryData.title,
        image: memoryData.imageUrl,
        description: memoryData.description
      };
      state.memories.push(newMemory);
    }
  },
  actions: {
    addMemory(context, memoryData) {
      context.commit('addMemory', memoryData);
    }
  }
});

export default store;
