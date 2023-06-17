<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/postselfpr">postselfpr</router-link> |
    <router-link to="/calendar">calendar</router-link>
  </nav>

  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
