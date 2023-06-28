<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Rampart+One&display=swap"
    rel="stylesheet"
  />
  <div class="tatle">
    就活の自己管理なら <br />
    JobHunt
    <div class="bank"></div>
    <a class="login"> ログイン・新規登録 </a>
  </div>
  <div class="c1">
    <h2>JobHuntでできること</h2>
  </div>
  <div class="right">
    <ul>
      <div class="c2">
        <div class="co">
          <img src="../images/home1.jpg" width="420" height="280" alt="" />
        </div>
        <div class="co">ToDoリストで予定を確認できる</div>
      </div>
      <div class="c3">
        <div class="co">みんなとESを共有できる</div>
        <div class="co">
          <img src="../images/home2.jpg" width="420" height="280" alt="" />
        </div>
      </div>
      <div class="c4">
        <div class="co">
          <img src="../images/home3.jpg" width="420" height="280" alt="" />
        </div>
        <div class="co">カレンダーで予定を一目で確認できる</div>
      </div>
    </ul>
  </div>
  <a class="login2">JobHuntをはじめる</a>
</template>

<script>
export default {
  mounted() {
    var scrollSize = [150, 400, 600, 800];
    window.addEventListener("scroll", function () {
      for (let i = 1; i < 5; i++) {
        const elm = document.querySelector(".c" + String(i));
        const scroll = window.scrollY;
        if (scroll > scrollSize[i - 1]) {
          elm.style.opacity = "1";
          // console.log(scroll);
        } else {
          elm.style.opacity = "0";
          // console.log(scroll);
        }
      }
    });
  },
};
</script>

<style>
.tatle {
  font-size: 40px;
  margin-top: 3%;
  padding-top: 20%;
  padding-left: 3%;
  padding-bottom: 9%;
  background-image: url(../images/shukatsu.jpg);
  background-size: auto;
  background-position: center;
  background-attachment: fixed;
  left: 0;
}
.login {
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  width: 120px;
  margin: auto;
  padding: 1rem 4rem;
  font-weight: bold;
  color: #0d1618;
  background-color: #fff;
  border-bottom: 2px solid #151818;
  border-radius: 100vh;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
}
.login:hover {
  color: #fff;
  background: #9ea0a0;
  border-bottom: 2px solid #fff;
  transform: translateY(3px);
}

.bank {
  padding: 5%;
}

h2 {
  text-align: center;
}

body {
  font-family: "Inter", sans-serif;
  background-color: rgb(253, 253, 253);
  left: 0;
  right: 0;
}
.right {
  margin-left: 10%;
  margin-right: 10%;
}

.right ul {
  display: flex;
  flex-wrap: wrap;
}

.right h1 {
  color: aliceblue;
  background-color: rgb(48, 47, 47);
  border-radius: 10px 10px 10px 10px;
  text-align: center;
}

.co {
  font-size: 23px;
  width: 420px;
  height: 280px;
  justify-content: center;
  display: flex;
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

.login2 {
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
  border: 1px solid #999;
  text-shadow: 0 1px #fff;
  box-shadow: 0 3px 2px 1px #fcfcfc, 0 4px 6px #cecfd1, 0 -2px 2px #cecfd1,
    0 -4px 2px #eee, inset 0 0 2px 2px #cecfd1;
  transition: 0.5s;
}
.login2:hover {
  opacity: 0.5;
}
</style>
