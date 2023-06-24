<template>
  <HeaderVue />
  <router-view />
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
