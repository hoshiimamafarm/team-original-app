<template>
  <div class="homeView">
    <div class="mainContant">
      <div class="title">就活の自己管理なら JobHunt</div>
      <router-link to="/login" class="loginLink">
        <a class="login"> ログイン・新規登録 </a>
      </router-link>
    </div>
    <div class="mainArea">
      <h2 class="c1">JobHuntでできること</h2>
      <div class="c2">
        <img src="../images/home1.jpg" class="co mainImg" alt="" />
        <div class="co">ToDoリストで予定を確認できる</div>
      </div>
      <div class="c3">
        <div class="co">みんなとESを共有できる</div>
        <img src="../images/home2.jpg" class="co mainImg" alt="" />
      </div>
      <div class="c4">
        <img src="../images/home3.jpg" class="co mainImg" alt="" />
        <div class="co">カレンダーで予定を一目で確認できる</div>
      </div>
    </div>
    <router-link to="/login" class="loginLink">
      <a class="loginBtn"> JobHuntをはじめる </a>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    var scrollSize = [150, 400, 600, 800];
    window.addEventListener("scroll", function () {
      let elm = 0;
      for (let i = 1; i < 5; i++) {
        elm = document.querySelector(".c" + String(i));
        const scroll = window.scrollY;
        if (scroll > scrollSize[i - 1]) {
          elm.style.opacity = 1;
        } else if (elm) {
          elm.style.opacity = 0;
        }
      }
    });
  },
};
</script>

<style scoped>
.mainContant {
  height: 90vh;
  background-image: url(../images/shukatsu.jpg);
  background-size: cover;
}

.title {
  padding-top: 20%;
  font-size: 2.5rem;
  width: 400px;
  word-wrap: break-word;
  margin-left: 5%;
}
.login {
  display: block;
  width: 150px;
  padding: 1rem 3rem;
  margin: 6rem auto;
  background-color: #fff;
  border-bottom: 2px solid #151818;
  border-radius: 100vh;
}
.loginLink {
  font-weight: bold;
  color: #0d1618;
  text-decoration: none;
}
.login:hover {
  color: #fff;
  background: #9ea0a0;
  border-bottom: 2px solid #fff;
  transform: translateY(3px);
}
.mainArea {
  width: 70%;
  margin: 50px auto;
}

.mainArea h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.mainImg {
  width: 50%;
}

.co {
  font-size: 23px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c1 {
  opacity: 0;
  transition: 0.5s;
}
.c2 {
  display: flex;
  opacity: 0;
  transition: 0.5s;
}
.c3 {
  display: flex;
  opacity: 0;
  transition: 0.5s;
}
.c4 {
  display: flex;
  opacity: 0;
  transition: 0.5s;
}

.loginBtn {
  display: block;
  text-align: center;
  font-size: 10px;
  text-decoration: none;
  width: 120px;
  margin: auto;
  padding: 1rem 4rem;
  font-weight: bold;
  background-image: linear-gradient(to top, #d8d9db 0%, #fff 80%, #fdfdfd 100%);
  border-radius: 100vh;
  color: #333;
  text-shadow: 0 1px #fff;
  box-shadow: 0 3px 2px 1px #fcfcfc, 0 4px 6px #cecfd1, 0 -2px 2px #cecfd1,
    0 -4px 2px #eee, inset 0 0 2px 2px #cecfd1;
  transition: 0.5s;
}
.loginBtn:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
