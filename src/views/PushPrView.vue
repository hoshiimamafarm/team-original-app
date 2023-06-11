<template>
  <h1>自己PR投稿</h1>
  <div>
    <div>
      <textarea v-model="titleText" placeholder="タイトル" />
    </div>
    <div>
      <textarea v-model="prText" placeholder="自己PRの内容" />
    </div>
    <div v-if="errors">
      <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
    </div>
    <div>
      <button v-on:click="postSelfPr">投稿</button>
    </div>
  </div>
  <ul v-for="(selfPr, index) in selfPrs" v-bind:key="index">
    <li>
      <div>
        {{ selfPr.title }}
      </div>
      <div>
        {{ selfPr.selfPr }}
      </div>
      <div class="deleteButton">
        <button v-on:click="deleteSelfPr(index)">削除</button>
      </div>
    </li>
  </ul>
  <div></div>
</template>

<script>
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  data() {
    return {
      titleText: "",
      prText: "",
      selfPrs: [],
      errors: [],
    };
  },
  created() {
    this.fetchSelfprData();
  },

  methods: {
    async fetchSelfprData() {
      const querySnapshot = await getDocs(collection(db, "selfPrs"));
      this.selfPrs = [];
      querySnapshot.forEach((doc) => {
        this.selfPrs.push({
          title: doc.data().title,
          selfPr: doc.data().selfPr,
          id: doc.id,
        });
      });
    },

    async postSelfPr() {
      if (!this.prText && !this.titleText) {
        this.errors.push("タイトルと内容を入れてください");
      } else if (!this.prText) {
        this.errors.push("内容を入れてください");
      } else if (!this.titleText) {
        this.errors.push("タイトルを入れてください");
      } else {
        await addDoc(collection(db, "selfPrs"), {
          title: this.titleText,
          selfPr: this.prText,
        });
        this.fetchSelfprData();

        (this.titleText = ""), (this.prText = "");
        this.errors.splice(0);
      }
    },
    async deleteSelfPr(index) {
      await deleteDoc(doc(db, "selfPrs", this.selfPrs[index].id));
      this.selfPrs.splice(index, 1);
    },
  },
};
</script>
