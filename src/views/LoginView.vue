<template>
  <div class="loginContainer">
    <div class="loginContent">
      <h3>ログイン・新規登録</h3>
      <div class="loginArea">
        <button class="loginButton" v-if="this.userId === ''" @click="signIn">
          <img src="../images/google.png" alt="" />
          Googleでログイン
        </button>
        <router-link loginButton to="/mypage" class="loginLink" v-else
          >さあ、JobHuntをはじめよう!</router-link
        >
      </div>
    </div>
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
      userId: "",
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

<style scoped>
.loginContainer {
  background-image: url(../images/login.jpg);
  height: 90vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginContent {
  background-color: #fff;
  width: 30%;
  border: solid 2px;
}

.loginContent h3 {
  border-bottom: solid 2px;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginArea {
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginLink {
  color: black;
  font-size: large;
  font-weight: bold;
  text-decoration: none;
}

.loginLink:hover {
  cursor: pointer;
  color: rgb(186, 223, 255);
}

.loginButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 5rem;
  border: solid 2px;
}

.loginButton:hover {
  cursor: pointer;
  opacity: 0.6;
}

.loginButton img {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}
</style>
