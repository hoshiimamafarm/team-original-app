<template>
  <div class="app">
    <h1>ToDoList</h1>
    <Datepicker
      v-model="selectedDate"
      placeholder="クリックして日時を入力"
      locale="jp"
      select-text="選択する"
      cansel-text="キャンセル"
      format="yyyy年MM月dd日"
    ></Datepicker>
    <div class="container">
      <input v-model="todoText" placeholder="ToDoを入力" />
      <button v-on:click="addTodo">追加</button>

      <ul>
        <li v-for="(todo, index) in selectedDateTodos" v-bind:key="index">
          <input type="checkbox" v-model="todo.completed" />
          <label v-bind:class="{ completed: todo.completed }">{{
            todo.text
          }}</label>
        </li>
      </ul>
    </div>
    <button v-on:click="deleteCompletedTodos">完了済みのToDoを削除</button>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    Datepicker: VueDatePicker,
  },
  data() {
    return {
      selectedDate: null,
      todoText: " ",
      todos: [],
    };
  },
  computed: {
    selectedDateTodos() {
      if (this.selectedDate !== null) {
        return this.todos.filter((todo) => {
          return todo.date.toDateString() === this.selectedDate.toDateString();
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    addTodo() {
      if (this.todoText.trim() !== "") {
        this.todos.push({
          date: this.selectedDate,
          text: this.todoText,
          completed: false,
        });
        this.todoText = "";
      }
      this.saveTodoToStorage();
    },
    deleteCompletedTodos() {
      this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
      });
      this.saveTodoToStorage();
    },
    saveTodoToStorage: function () {
      localStorage.setItem("todos", JSON.stringify(this.todos));
      console.log("saved!");
    },
    readTodoFromStorage: function () {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      if (!this.todos) {
        this.todos = [];
      } else {
        this.todos.forEach((todo) => {
          todo.date = new Date(todo.date);
        });
      }
    },
  },
  mounted: function () {
    this.readTodoFromStorage();
  },
};
</script>
<style>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.dp__button {
  display: none;
}
.completed {
  text-decoration: line-through;
}
</style>
