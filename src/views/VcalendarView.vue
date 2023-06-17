<template>
  <div id="calendarapp">
    <Calendar />
  </div>
  <div>
    <button v-on="moveToCreateTodoPage">作成</button>
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
    moveToCreateTodoPage() {},
  },
};
</script>
