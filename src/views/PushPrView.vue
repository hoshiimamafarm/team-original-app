<template>
  <h1>自己PR投稿</h1>
  <div v-if="this.userId === ''">ログインしてください</div>
  <div v-else>
    <textarea v-model="titleText" placeholder="タイトル" />
    <textarea v-model="prText" placeholder="自己PRの内容" />
    <div v-if="errors">
      <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
    </div>
    <button v-on:click="postSelfPr">投稿</button>
    <ul v-for="(selfPr, index) in selfPrs" v-bind:key="index">
      <li>
        <div>
          {{ selfPr.title }}
        </div>
        <div>
          {{ selfPr.selfPr }}
        </div>
        <button v-on:click="deleteSelfPr(index)">削除</button>
      </li>
    </ul>
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
} from "../firebase.js";

export default {
  data() {
    return {
      titleText: "",
      prText: "",
      selfPrs: [],
      errors: [],
      userId: "",
    };
  },

  methods: {
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

    getUserId() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        this.userId = user.uid;
      }
    },
  },

  created() {
    this.fetchSelfprData();
    this.getUserId();
  },
};
</script>
