<template>
  <h1>自己PR投稿</h1>
  <div class="home__wrapper">
    <div class="title_container">
      <textarea v-model="title_text" placeholder="タイトル"></textarea>
    </div>
    <div class="pr_container">
      <textarea v-model="pr_text" placeholder="自己PRの内容"></textarea>
    </div>
    <div v-if="errors">
      <div v-for="error in errors" v-bind:key="error">{{ error }}</div>
    </div>
    <div class="push-button">
      <button v-on:click="pushButton">投稿</button>
    </div>
  </div>
  <ul
    class="pr-list_container"
    v-for="(text, index) in texts"
    v-bind:key="index"
  >
    <li class="pr">
      <div>
        {{ text.title }}
      </div>
      <div>
        {{ text.pr }}
      </div>
      <div class="deleteButton">
        <button v-on:click="deleteButton(index)">削除</button>
      </div>
    </li>
  </ul>
  <div></div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  data() {
    return {
      title_text: "",
      pr_text: "",
      texts: [],
      errors: [],
    };
  },
  methods: {
    async pushButton() {
      await addDoc(collection(db, "selfPrs"), {
        title: this.title_text,
        selfPr: this.pr_text,
      });
      if (!this.pr_text) {
        this.errors.push("内容を入れてください");
      } else if (!this.title_text) {
        this.errors.push("タイトルを入れてください");
      } else {
        this.texts.push({
          title: this.title_text,
          pr: this.pr_text,
        });
        (this.title_text = ""), (this.pr_text = "");
        this.errors.splice(0);
      }
    },

    deleteButton(index) {
      this.texts.splice(index, 1);
    },
  },
};
</script>
