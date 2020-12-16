<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div class="row">
      <div class="col-lg-9"></div>
      <div class="col-lg-3">
        <div id="logreg-forms">
          <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
              Sign in
            </h1>
            <div class="social-login">
              <button class="btn google-btn social-btn" type="button" @click="googleLogin">
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
              @click="showSignupModal = true"
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
    <div v-if="showSignupModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Sign Up</h4>
                  <button
                    type="button"
                    class="close"
                    @click="showSignupModal = false"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p style="text-align: center"></p>
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    required=""
                    autofocus=""
                    v-model="signUpEmail"
                  />
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required=""
                    v-model="signUpPassword"
                  />
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    required=""
                    v-model="confirmPassword"
                  />

                  <button
                    class="btn btn-success btn-block"
                    type="submit"
                    @click="signUp"
                  >
                    <i class="fas fa-sign-in-alt"></i> Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
      signUpEmail: "",
      signUpPassword: "",
      confirmPassword: "",
      showSignupModal: false,
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
                // this.$router.push({
                //     path: '/settlement-data-cases/:isSavedSearchRequired'
                // });
      } catch (error) {
        alert(error);
      }
    },

    async signUp() {
      console.log("Sign Up");
      this.showSignupModal = false;
      if (this.signUpPassword !== this.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signUpEmail,
            this.signUpPassword
          );
        this.showSignupModal = false;
        alert("Created")
      } catch (error) {
        alert(error);
      }
    },

  async googleLogin(){
}
  },
};
</script>
<style src="./home.css">
</style>