<template>
  <div id="app">
    <Calendar />
  </div>
  <div>
    <button v-on="createDate">作成</button>
  </div>
</template>

<script>
import Calendar from "../components/VCalendar.vue";

export default {
  name: "App",
  components: {
    Calendar,
  },
  data() {
    return {};
  },
  methods: {
    createDate() {},
  },
};
</script>
