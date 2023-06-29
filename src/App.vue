<template>
  <div class="header">
    <HeaderVue />
  </div>
  <div class="router">
    <router-view />
  </div>
  <FooterVue />
</template>

<script>
import HeaderVue from "./components/HeaderVue.vue";
import FooterVue from "./components/FooterVue.vue";

export default {
  name: "App",
  components: {
    HeaderVue,
    FooterVue,
  },
};
</script>
<style scoped>
.header {
  margin-top: 0;
}
</style>
