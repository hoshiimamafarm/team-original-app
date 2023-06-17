<template>
  <div class="page">
    <div>{{ username }}</div>
    <img v-bind:src="userphoto" />
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  data() {
    return {
      userphoto: "",
      username: "",
      login_fin: true,
    };
  },
  methods: {
    async getData() {
      const q = query(collection(db, "tests"), where("userId", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    },
  },
  mounted() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        this.userphoto = user.photoURL;
        this.username = user.displayName;
        this.login_fin = false;
      })
      .catch((error) => {
        console.log(error);
      });
    this.getData();
  },
};
</script>
