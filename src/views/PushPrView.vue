<template>
  <h1>自己PR投稿</h1>
  <div>
    <div>
      <textarea v-model="title_text" placeholder="タイトル"></textarea>
    </div>
    <div>
      <textarea v-model="pr_text" placeholder="自己PRの内容"></textarea>
    </div>
    <div v-if="errors">
      <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
    </div>
    <div>
      <button v-on:click="postSelfPrButton">投稿</button>
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
        <button v-on:click="deleteSelfPrButton(index)">削除</button>
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
      title_text: "",
      pr_text: "",
      selfPrs: [],
      errors: [],
    };
  },
  methods: {
    async fetchdata() {
      const querySnapshot = await getDocs(collection(db, "selfPrs"));
      this.selfPrs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().title);
        console.log(doc.data().selfPr);
        this.selfPrs.push({
          title: doc.data().title,
          selfPr: doc.data().selfPr,
          id: doc.id,
        });
      });
    },

    async postSelfPrButton() {
      if (!this.pr_text && !this.title_text) {
        this.errors.push("タイトルと内容を入れてください");
      } else if (!this.pr_text) {
        this.errors.push("内容を入れてください");
      } else if (!this.title_text) {
        this.errors.push("タイトルを入れてください");
      } else {
        await addDoc(collection(db, "selfPrs"), {
          title: this.title_text,
          selfPr: this.pr_text,
        });

        this.fetchdata();
        (this.title_text = ""), (this.pr_text = "");
        this.errors.splice(0);
      }
    },
    async deletedata(index) {
      await deleteDoc(doc(db, "selfPrs", this.selfPrs[index].id));
      this.selfPrs.splice(index, 1);
    },

    deleteSelfPrButton(index) {
      this.deletedata(index);
    },
  },
};
</script>
