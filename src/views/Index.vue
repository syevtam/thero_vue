<template>
  <div class="container">
    <vs-button v-if="authStatus === false" transparent @click="triggerAuth()"
      ><h1>Proceed to the multimedia with THERO</h1></vs-button
    >
    <h1 v-if="authStatus === true">Now you choose whatever you want</h1>
  </div>
</template>

<script>
export default {
  name: "Index",
  computed: {
    authStatus() {
      return this.$store.getters.getAuth;
    },
  },
  methods: {
    triggerAuth() {
      this.$store.dispatch("authUser", { vm: this });
    },
  },
};
</script>

<style scoped lang="stylus">
h1 {
  font-weight: 100;
  text-transform: uppercase;
}

.container {
  min-height: 70vh;
  min-width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>