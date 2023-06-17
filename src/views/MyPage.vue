<template>
  <div class="page">
    <div>{{ username }}</div>
    <img v-bind:src="userphoto" />
    <button v-if="!username" @click="signIn">Googleでログイン</button>
    <button v-else @click="signOut">logout</button>
  </div>
</template>

<script>
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "../firebase";
export default {
  data() {
    return {
      userphoto: "",
      username: "",
    };
  },
  methods: {
    async signOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.userphoto = "";
        this.username = "";
      });
    },
    async signIn() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence);
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          this.userphoto = user.photoURL;
          this.username = user.displayName;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.username = user.displayName;
        this.userphoto = user.photoURL;
      });
    },
  },
  created() {
    const auth = getAuth();
    this.username = auth.currentUser?.displayName;
    this.onAuthChange();
  },
};
</script>
