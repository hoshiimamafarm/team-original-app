<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap"
    rel="stylesheet"
  />
  <div class="main">
    <h3>ログイン・新規登録</h3>
    <button class="loginButton" v-if="!userName" @click="signIn">
      <img src="../assets/google.png" alt="" />
      Googleアカウントでログイン
    </button>
    <router-link loginButton to="/mypage" v-else
      >さあ、JobHuntをはじめよう!</router-link
    >
  </div>
</template>
<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "../firebase";

export default {
  data() {
    return {
      userName: "",
    };
  },

  methods: {
    async signIn() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence);
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          this.username = user.displayName;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onAuthChange() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log(user);
      });
    },
  },

  created() {
    const auth = getAuth();
    if (!auth.currentUser) {
      console.log("ログインしてください！");
    } else {
      this.userName = auth.currentUser?.displayName;
      this.onAuthChange();
    }
  },
};
</script>

<style>
body {
  font-family: "Inter", sans-serif;
  background-image: url(../assets/login.jpg);
}

.main {
  background-color: rgb(241, 242, 245);
  margin: 15% 30% 5% 30%;
  border: solid 2px;
  text-align: center;
}

.main h3 {
  border-bottom: solid 2px;
}

.loginButton {
  display: flex;
  align-items: center;
  border: solid 2px;
  margin: 15%;
  padding: 4%;
  padding-right: 10%;
}

.loginButton img {
  width: 40px;
  height: 40px;
}
</style>
