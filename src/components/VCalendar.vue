<template>
  <VCalendar :rows="2" title-position="center" :attributes="attrs" expanded />
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    async fetchTodoDate() {
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        this.todos.push({
          dates: [doc.data().date.toDate()],
          description: doc.data().todo,
          id: doc.id,
          color: "red",
        });
      });
    },
  },

  computed: {
    attrs() {
      return [
        ...this.todos.map((todo) => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
          },
          popover: {
            label: todo.description,
            visibility: "focus",
          },
        })),
      ];
    },
  },
  created() {
    this.fetchTodoDate();
  },
};
</script>
