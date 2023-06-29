<template>
  <div class="container">
    <h1 class="title">ToDoリスト</h1>
    <div class="background">
      <div v-if="this.userId === ''">ログインしてください</div>
      <div v-else>
        <div class="left-section">
          <div class="top-section">
            <div class="centered">
              <Datepicker
                v-model="selectedDate"
                placeholder="クリックして日時を入力"
                locale="jp"
                select-text="選択する"
                cansel-text="キャンセル"
                format="yyyy年MM月dd日"
                class="datepicker"
              />
              <input v-model="todoText" placeholder="ToDoを入力" />
            </div>
          </div>
          <button v-on:click="addTodo">追加</button>
        </div>
        <div class="right-section">
          <div class="wrapper">
            <div class="todo-section">
              <ul>
                <li v-for="(todo, index) in todos" v-bind:key="index">
                  <input type="checkbox" v-model="todo.completed" />
                  <label v-bind:class="{ completed: todo.completed }"
                    >{{ todo.todo }} {{ formatDate(todo.date) }}</label
                  >
                </li>
              </ul>
            </div>
            <div class="delete-section">
              <button v-on:click="deleteCompletedTodos">
                完了済みのToDoを削除
              </button>
            </div>
          </div>
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

    getUserId() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        this.userId = user.uid;
      }
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

  created() {
    this.fetchTodos();
    this.getUserId();
  },
};
</script>

<style>
.container {
  background-image: url("../assets/todo.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.background {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  width: 80%;
  max-width: 600px;
  padding: 20px;
}

.title {
  margin: 10px;
}

.left-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-section {
  margin-top: 20px;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.centered {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.datepicker {
  width: 300px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  margin-bottom: 0px;
}

.todo-section {
  margin-bottom: 20px;
}

.delete-section {
  display: flex;
  justify-content: flex-end;
}

.completed {
  text-decoration: line-through;
}
</style>
