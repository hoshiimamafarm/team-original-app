<template>
  <div>
    <div>{{ userName }}</div>
    <img v-bind:src="userPhoto" />
    <button v-if="!userId" @click="signIn">Googleでログイン</button>
    <button v-else @click="signOut">logout</button>
  </div>
  <Calendar :userId="this.userId" />
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "../firebase";
import Calendar from "../components/VCalendar.vue";

export default {
  components: {
    Calendar,
  },

  data() {
    return {
      userPhoto: "",
      userName: "",
      userId: "",
    };
  },

  methods: {
    async signOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.userPhoto = "";
        this.userName = "";
        this.userId = "";
      });
    },

    async signIn() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence);
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          this.userPhoto = user.photoURL;
          this.userName = user.displayName;
          this.userId = user.uid;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.userName = user.displayName;
        this.userPhoto = user.photoURL;
        this.userId = user.uid;
      });
    },

    checkLogin() {
      const auth = getAuth();
      if (!auth.currentUser) {
        console.log("ログインしてください！");
      } else {
        console.log("実行");
        this.userName = auth.currentUser?.displayName;
        this.onAuthChange();
      }
    },
  },

  mounted() {
    window.onload = () => {
      this.onAuthChange();
    };
  },

  created() {
    this.checkLogin();
  },
};
</script>
