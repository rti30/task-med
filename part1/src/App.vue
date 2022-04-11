<template>
  <main
    id="app"
    class="page"
  >
    <AppForm @message="showMessage" />
    <AppAlert ref="message" />
  </main>
</template>

<script>
import AppForm from "./components/client-form/ClientForm.vue";
import AppAlert from "@/common/Alert.vue";

export default {
  name: "App",
  components: {
    AppForm,
    AppAlert,
  },
  methods: {
    showMessage(message) {
      this.$refs.message.add(message);
    },
  },
};
</script>

<style lang="sass">
</style>