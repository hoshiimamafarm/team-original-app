<template>
  <h1>みんなのES投稿</h1>
  <div v-if="this.userId === ''">ログインしてください</div>
  <div v-else class="pr">
    <div class="loolprContainer">
      <div class="lookpr">
        <h2>新着投稿</h2>
        <div
          v-for="(selfPr, index) in selfPrs"
          v-bind:key="index"
          class="loolprone"
        >
          <div>
            {{ selfPr.title }}
          </div>
          <div>
            {{ selfPr.selfPr }}
          </div>
          <button v-on:click="deleteSelfPr(index)">削除</button>
        </div>
      </div>
    </div>
    <div class="pushtextContainer">
      <div class="pushtext">
        <h2>投稿フォーム</h2>
        <div>
          <textarea v-model="titleText" placeholder="タイトル"></textarea>
          <div class="textarea-container">
            <textarea
              v-model="prText"
              placeholder="わたしのES"
              class="textarea bg-white"
              :style="textareaStyle"
              @input="handleInput"
            ></textarea>
          </div>
        </div>
        <div v-if="errors">
          <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
        </div>
        <button v-on:click="postSelfPr">投稿</button>
      </div>
      <div class="img">
        <img src="../assets/22911683.jpg" />
      </div>
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
html {
  word-break: break-all;
}

h2 {
  text-align: center;
  text-decoration: underline;
}
.pr {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.loolprContainer {
  width: 200%;
  padding-left: 5%;
  padding-right: 5%;
}
.lookpr {
  width: 100%;
  height: 700px;
  padding: 30px 20px;
  box-sizing: border-box;
  border: 1px solid #333;
  text-align: center;
  overflow: hidden scroll;
}
.loolprone {
  padding-top: 2%;
  padding-bottom: 2%;
}
.pushtextContainer {
  padding-right: 5%;
}
.pushtext {
  width: 80%;
  padding: 30px 20px;
  box-sizing: border-box;
  border: 1px solid #333;
  text-align: -webkit-center;
}
.img img {
  width: 100%;
  height: 40%;
}

.textarea-container {
  width: 100%;
}

.textarea {
  width: 80%;
  min-height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 5px 12px;

  &::placeholder {
    color: #d9d9d9;
  }
}
</style>
