<template>
  <HeaderVue />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/todolist">ToDoList</router-link>
  </nav>
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
