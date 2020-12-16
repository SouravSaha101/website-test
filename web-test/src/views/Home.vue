<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="row">
      <div class="col-lg-9">
      </div>
      <div class="col-lg-3">
        <div id="logreg-forms">
          <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
              Sign in
            </h1>
            <div class="social-login">
              <button class="btn google-btn social-btn" type="button">
                <span
                  ><i class="fab fa-google-plus-g"></i> Sign in with
                  Google</span
                >
              </button>
            </div>
            <p style="text-align: center">OR</p>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required=""
              autofocus=""
              v-model="email"
            />
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required=""
              v-model="password"
            />

            <button
              class="btn btn-success btn-block"
              type="submit"
              @click="login"
            >
              <i class="fas fa-sign-in-alt"></i> Sign in
            </button>
            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr />
            <!-- <p>Don't have an account!</p>  -->
            <button
              class="btn btn-primary btn-block"
              type="button"
              id="btn-signup"
              data-toggle="modal"
              data-target="#myModalHorizontal"
            >
              <i class="fas fa-user-plus"></i> Sign up New Account
            </button>
          </form>

          <form action="/reset/password/" class="form-reset">
            <input
              type="email"
              id="resetEmail"
              class="form-control"
              placeholder="Email address"
              required=""
              autofocus=""
            />
            <button class="btn btn-primary btn-block" type="submit">
              Reset Password
            </button>
            <a href="#" id="cancel_reset"
              ><i class="fas fa-angle-left"></i> Back</a
            >
          </form>

          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      console.log("Logon");
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        alert("success");
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
<style src="./home.css">
</style>