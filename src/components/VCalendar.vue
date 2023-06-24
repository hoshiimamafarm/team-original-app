<template>
  <VCalendar :rows="2" title-position="center" :attributes="attrs" expanded />
</template>
<script>
import { db, collection, query, where, getDocs } from "../firebase.js";

export default {
  props: {
    userId: String,
  },

  data() {
    return {
      todos: [],
    };
  },

  methods: {
    async fetchTodoData() {
      const todoRef = collection(db, "todos");
      const queryTodo = query(todoRef, where("userId", "==", this.userId));
      const querySnapshot = await getDocs(queryTodo);
      querySnapshot?.forEach((doc) => {
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

    getUser() {
      if (this.userId) {
        this.fetchTodoData();
      }
      return this.userId;
    },
  },

  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.fetchTodoData();
        }
      },
      deep: true,
    },
  },

  created() {
    if (this.userId) {
      this.fetchTodoData();
    }
  },
};
</script>
