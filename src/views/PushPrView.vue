<template>
  <h1 class="pushprTitle">みんなのES投稿</h1>
  <div class="pushprContainer">
    <div class="pushprContent">
      <div v-if="this.userId === ''">ログインしてください</div>
      <div v-else>
        <div class="lookPrContainer">
          <div class="lookpr">
            <h2>新着投稿</h2>
            <div
              v-for="(selfPr, index) in selfPrs"
              v-bind:key="index"
              class="lookOnePr"
            >
              <div class="prTitle">
                {{ selfPr.title }}
              </div>
              <div>
                {{ selfPr.selfPr }}
              </div>
              <button v-on:click="deleteSelfPr(index)" class="deleteBtn">
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pushtextContainer">
      <div class="pushtext">
        <h2 class="formTitle">投稿フォーム</h2>
        <div>
          <input
            v-model="titleText"
            placeholder="タイトル"
            class="textareaTitle"
          />
          <textarea
            v-model="prText"
            placeholder="わたしのES"
            class="textarea bg-white"
            :style="textareaStyle"
            @input="handleInput"
          />
        </div>
        <div v-if="errors">
          <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
        </div>
        <button v-on:click="postSelfPr" class="postBtn">投稿</button>
      </div>
      <img src="../images/22911683.jpg" class="img" />
    </div>
  </div>
</template>

<script>
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getAuth,
  onAuthStateChanged,
} from "../firebase.js";

export default {
  data() {
    return {
      titleText: "",
      prText: "",
      selfPrs: [],
      errors: [],
      userId: "",
      textareaHeight: 100,
    };
  },
  computed: {
    textareaStyle() {
      return {
        height: `${this.textareaHeight}px`,
      };
    },
  },

  methods: {
    handleInput(event) {
      this.prText = event.target.value;
      this.textareaHeight = 0;

      this.$nextTick(() => {
        this.textareaHeight = event.target.scrollHeight;
      });
    },

    async fetchSelfprData() {
      this.selfPrs = [];
      const querySnapshot = await getDocs(collection(db, "selfPrs"));
      querySnapshot.forEach((doc) => {
        this.selfPrs.push({
          title: doc.data().title,
          selfPr: doc.data().selfPr,
          id: doc.id,
        });
      });
    },

    postSelfPr() {
      if (!this.prText && !this.titleText) {
        this.errors.push("タイトルと内容を入れてください");
      } else if (!this.prText) {
        this.errors.push("内容を入れてください");
      } else if (!this.titleText) {
        this.errors.push("タイトルを入れてください");
      } else {
        addDoc(collection(db, "selfPrs"), {
          title: this.titleText,
          selfPr: this.prText,
          userId: this.userId,
        });

        this.titleText = "";
        this.prText = "";
        this.errors.splice(0);
        this.fetchSelfprData();
      }
    },

    async deleteSelfPr(index) {
      await deleteDoc(doc(db, "selfPrs", this.selfPrs[index].id));
      this.fetchSelfprData();
    },

    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.userId = user.uid;
      });
    },
  },

  mounted() {
    window.onload = () => {
      this.onAuthChange();
    };
  },

  created() {
    this.fetchSelfprData();
    this.onAuthChange();
  },
};
</script>

<style scoped>
.pushprContainer {
  display: flex;
  justify-content: center;
}

.pushprTitle {
  text-align: center;
  margin: 2rem 0;
}

.pushprContent {
  width: 65%;
}

.pushprContent h2 {
  text-align: center;
  text-decoration: underline;
}
.lookPrContainer {
  margin: 0 2.5rem;
}

.lookpr {
  width: 100%;
  height: 70vh;
  padding: 3rem 2rem;
  box-sizing: border-box;
  border: 1px solid #333;
  text-align: center;
  overflow: hidden scroll;
}
.prTitle {
  font-size: larger;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 0.5rem;
}
.lookOnePr {
  padding: 1rem 0;
}
.deleteBtn {
  width: 30%;
  height: 2.5rem;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  padding: 0 2rem;
}

.deleteBtn:hover {
  cursor: pointer;
  background-color: #373737;
  color: #ccc;
}

.pushtextContainer {
  width: 50%;
}
.pushtext {
  width: 80%;
  padding: 3rem 2rem;
  border: 1px solid #333;
  text-align: center;
}

.formTitle {
  text-decoration: underline;
  margin-bottom: 1rem;
}

.textareaTitle {
  width: 80%;
  height: 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0.2rem 1rem;
  margin: 1rem 0;
  font-size: medium;
}
.textarea {
  width: 80%;
  min-height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 1rem;
  word-break: break-all;
  font-size: medium;
}
.textarea::placeholder {
  color: #d9d9d9;
}
.img {
  height: 50vh;
}
.postBtn {
  width: 30%;
  height: 2.5rem;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  padding: 0 2rem;
}
.postBtn:hover {
  cursor: pointer;
  background-color: #373737;
  color: #ccc;
}
</style>
