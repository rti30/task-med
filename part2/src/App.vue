<template>
  <main
    id="app"
    class="page"
  >
    <div class="content-width">
      <AppSymon />
    </div>
  </main>
</template>

<script>
import AppSymon from "./components/Symon.vue";
export default {
  name: "App",
  components: {
    AppSymon,
  },
};
</script>

<style lang="sass">
</style>