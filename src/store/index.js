import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    au: false,
    user: null,
    keys: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.keys = payload.keys;
      state.au = payload.au;
    },
    resetUser(state) {
      state.user = null;
      state.keys = null;
      state.au = false;
    },
  },
  actions: {
    async authUser({ commit }, { vm }) {
      const googleUser = await vm.$gAuth.signIn();
      if (!googleUser) {
        return null;
      }
      let user = googleUser.getBasicProfile();
      let keys = Object.keys(user);
      try {
        let r = await vm.$axios.post(
          "http://localhost:8080/auth/serialize",
          {
            googleID: user[keys[0]],
            userData: user,
          }
        );
        console.log(r);
        commit("setUser", { user, keys, au: true });
      } catch (error) {
        console.log(error);
      }
    },
    async logoutUser({ commit }, { vm }) {
      await vm.$gAuth.signOut();
      vm.$router.push("/");
      commit("resetUser");
    },
  },
  getters: {
    getAuth: (state) => {
      return state.au;
    },
    getUser: (state) => {
      return state.user;
    },
    getUserPhoto: (state) => {
      return state.user !== null
        ? Object.values(state.user).filter((x) => x.includes("https"))[0]
        : 0;
    },
    getUserName: (state) => {
      return state.user !== null
        ? Object.values(state.user).filter((x) => x.split(" ").length >= 2)[0]
        : 0;
    },
  },
  modules: {},
});
