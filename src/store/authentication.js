//
// simple state to manage authentication and saving the user
// information in the local storage
//
// @see https://github.com/vuejs/vuex/tree/v4.0.0-rc.1
//
const authentication = {
    state() {
      return {
        user: null,
        authChecked: false,
      };
    },
  
    // ACTIONS (asynchronous)
    actions: {
      /**
       * checks to see if there was an instance of a user from
       * the last session
       *
       * @param context
       */
      initialize(context) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const userString = localStorage.getItem("USER");
            const user = userString !== null ? JSON.parse(userString) : null;
            context.commit("checkAuth", { authChecked: true, user });
            if (user) {
              context.commit("hasUser", { user: { email: user.email } });
            } else {
              context.commit("hasUser", null);
            }
            resolve(true);
          }, 1000);
        });
      },
      /**
       * logs in the user using the paramaeters fron the payload, email & password
       * @param context
       * @param payload
       */
      login(context, payload) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (payload.email !== "") {
              localStorage.setItem("USER", JSON.stringify(payload));
              if (payload.email) {
                context.commit("hasUser", { user: { email: payload.email } });
              } else {
                context.commit("hasUser", null);
              }
              console.log(context.state.user);
              resolve(true);
            } else {
              context.commit("clearUser", {});
              resolve(false);
            }
          }, 1000);
        });
      },
      /**
       * logout the user, clear the information from local storage
       * @param context
       */
      logout(context) {
        return new Promise((resolve) => {
          setTimeout(() => {
            context.commit("clearUser", {});
            localStorage.removeItem("USER");
            resolve(true);
          }, 1000);
        });
      },
    },
  
    // MUTATIONS ( set the state )
    mutations: {
      hasUser(state, payload) {
        state.user = payload?.user || null;
        console.log(state);
      },
      clearUser(state) {
        state.user = null;
        console.log(state);
      },
      checkAuth(state, payload) {
        state.user = payload.user;
        state.authChecked = payload.authChecked;
        console.log(state);
      },
    },
    getters: {
      /**
       * returns true or false based on if a user exists or not
       * @param state
       */
      isLoggedIn(state) {
        return state.user !== null;
      },
      /**
       * returns the current user
       * @param state
       */
      currentUser(state) {
        return state.user;
      },
    },
    namespaced: true,
  };
  
  export default authentication;
  