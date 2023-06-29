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
<style>
.header {
  z-index: 2;
  margin-top: 0;
}
.router {
  z-index: 1;
}
</style>
