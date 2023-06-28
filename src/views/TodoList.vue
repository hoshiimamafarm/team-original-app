<template>
  <h1>ToDoList</h1>
  <div v-if="this.userId === ''">ログインしてください</div>
  <div v-else>
    <Datepicker
      v-model="selectedDate"
      placeholder="クリックして日時を入力"
      locale="jp"
      select-text="選択する"
      cansel-text="キャンセル"
      format="yyyy年MM月dd日"
    />
    <input v-model="todoText" placeholder="ToDoを入力" />
    <button v-on:click="addTodo">追加</button>

    <ul>
      <li v-for="(todo, index) in selectedDateTodos" v-bind:key="index">
        <input type="checkbox" v-model="todo.completed" />
        <label v-bind:class="{ completed: todo.completed }"
          >{{ todo.todo }} {{ formatDate(todo.date) }}</label
        >
      </li>
    </ul>
    <button v-on:click="deleteCompletedTodos">完了済みのToDoを削除</button>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  db,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  getAuth,
  onAuthStateChanged,
} from "../firebase";

export default {
  components: {
    Datepicker: VueDatePicker,
  },

  data() {
    return {
      selectedDate: null,
      todoText: "",
      todos: [],
      userId: "",
    };
  },

  methods: {
    async addTodo() {
      if (this.todoText.trim() !== "") {
        await addDoc(collection(db, "todos"), {
          date: this.selectedDate,
          todo: this.todoText,
          userId: this.userId,
          completed: false,
        });
        this.selectedDate = "";
        this.todoText = "";
      }
    },

    deleteCompletedTodos() {
      const completedTodos = this.selectedDateTodos.filter(
        (todo) => todo.completed
      );
      completedTodos.forEach((todo) => {
        deleteDoc(doc(db, "todos", todo.id));
      });
    },

    async fetchTodos() {
      const querySnapshot = await getDocs(collection(db, "todos"));
      this.todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        date: doc.data().date,
      }));

      onSnapshot(collection(db, "todos"), (snapshot) => {
        this.todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          date: doc.data().date,
        }));
      });
    },

    formatDate(date) {
      let y = date.getFullYear();
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let d = ("0" + date.getDate()).slice(-2);
      return y + "-" + m + "-" + d;
    },

    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.userId = user.uid;
      });
    },
  },

  computed: {
    selectedDateTodos() {
      if (this.selectedDate !== null) {
        return this.todos.filter((todo) => {
          return todo.date === this.selectedDate;
        });
      } else {
        return [];
      }
    },
  },

  mounted() {
    window.onload = () => {
      this.onAuthChange();
    };
  },

  created() {
    this.fetchTodos();
    this.onAuthChange();
  },
};
</script>