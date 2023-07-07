<template>
  <div class="container">
    <h1 class="title">ToDoリスト</h1>
    <div class="background">
      <div v-if="this.userId === ''">ログインしてください</div>
      <div v-else>
        <div class="left-section">
          <Datepicker
            v-model="selectedDate"
            placeholder="クリックして日時を入力"
            locale="jp"
            select-text="選択する"
            cansel-text="キャンセル"
            format="yyyy年MM月dd日"
            class="datepicker"
          />
          <input
            v-model="todoText"
            placeholder="ToDoを入力"
            class="todo-input"
          />
          <button v-on:click="addTodo" class="todo-btn">追加</button>
        </div>
        <div class="right-section">
          <ul>
            <li
              v-for="(todo, index) in todos"
              v-bind:key="index"
              class="todo-list"
            >
              <input type="checkbox" v-model="todo.completed" />
              <label v-bind:class="{ completed: todo.completed }"
                >{{ todo.todo }} {{ formatDate(todo.date) }}</label
              >
            </li>
          </ul>
          <button v-on:click="deleteCompletedTodos" class="delete-btn">
            完了済みのToDoを削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  db,
  getAuth,
  onAuthStateChanged,
  query,
  where,
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

        this.todoText = "";
      }
      await this.fetchTodos();
    },

    async deleteCompletedTodos() {
      const completedTodos = this.todos.filter((todo) => todo.completed);
      completedTodos.forEach((todo) => {
        deleteDoc(doc(db, "todos", todo.id));
      });
      await this.fetchTodos();
    },

    async fetchTodos() {
      this.todos = [];
      const todoRef = collection(db, "todos");
      const queryTodo = query(todoRef, where("userId", "==", this.userId));
      const querySnapshot = await getDocs(queryTodo);
      querySnapshot?.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          date: doc.data().date.toDate(),
          todo: doc.data().todo,
          completed: false,
        });
      });
      await this.sortTodos();
    },

    formatDate(date) {
      let y = date.getFullYear();
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let d = ("0" + date.getDate()).slice(-2);
      return y + "-" + m + "-" + d;
    },

    async sortTodos() {
      if (this.selectedDate) {
        this.todos = this.todos.filter((todo) => {
          return (
            this.formatDate(todo.date) === this.formatDate(this.selectedDate)
          );
        });
      } else {
        return (this.todos = []);
      }
    },

    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.userId = user.uid;
      });
    },
  },

  watch: {
    selectedDate: async function () {
      if (this.selectedDate) {
        await this.fetchTodos();
        this.todos = this.todos.filter((todo) => {
          return (
            this.formatDate(todo.date) === this.formatDate(this.selectedDate)
          );
        });
      } else {
        this.todos = [];
      }
    },
    deep: true,
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

<style scoped>
.container {
  background-image: url("../images/todo.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.background {
  background-color: #fff;
  border: 1px solid #ccc;
  width: 50%;
  padding: 2rem;
}

.left-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.datepicker {
  width: 40%;
}

.todo-input {
  width: 40%;
  height: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  padding: 0.2rem 0.5rem;
  margin: 0 0.5rem;
  font-size: medium;
}

.todo-btn {
  width: 10%;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}
.todo-btn:hover {
  cursor: pointer;
  background-color: #373737;
  color: #ccc;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right-section ul {
  margin: 1rem 0;
}

.todo-list {
  list-style: none;
  margin: 0.5rem 0;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

.completed {
  text-decoration: line-through;
}

.delete-btn {
  width: 30%;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  padding: 0 2rem;
}

.delete-btn:hover {
  cursor: pointer;
  background-color: #373737;
  color: #ccc;
}
</style>
