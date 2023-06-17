<template>
  <nav>
    <router-link to="/">home</router-link>|
    <router-link to="/about">about</router-link>|
    <router-link to="/calendar">calendar</router-link>|
  </nav>

  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
