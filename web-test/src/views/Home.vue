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
              Sign In with Google
            </h1>
            <button @click="googleLogin" class="social-button">
              <img alt="Google Logo" src="../assets/google-logo.png" />
            </button>
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
              id="inputPassword3"
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
                    type="input"
                    id="inputName"
                    class="form-control"
                    placeholder="Name"
                    required=""
                    autofocus=""
                    v-model="signUpData.name"
                  />
                  <input
                    type="number"
                    id="inputPhone"
                    class="form-control"
                    placeholder="Phone Number"
                    required=""
                    autofocus=""
                    v-model="signUpData.phoneno"
                  />
                  <!-- <mdb-form-inline> -->
                  Are You in India:
                  <br />
                  <input
                    type="radio"
                    id="Yes"
                    value="true"
                    v-model="signUpData.isIndian"
                  />
                  <label for="Yes">Yes</label>
                  <br />
                  <input
                    type="radio"
                    id="two"
                    value="false"
                    v-model="signUpData.isIndian"
                  />
                  <label for="No">No</label>
                  <br />
                  Enter date of birth:
                  <datepicker v-model="signUpData.age"></datepicker>
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    required=""
                    autofocus=""
                    v-model="signUpData.email"
                  />
                  <input
                    type="password"
                    id="inputPassword1"
                    class="form-control"
                    placeholder="Password"
                    required=""
                    v-model="signUpPassword"
                  />
                  <input
                    type="password"
                    id="inputPassword2"
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
import { db } from "./../firebase";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    datepicker: Datepicker,
  },
  data() {
    return {
      email: "",
      password: "",
      signUpData: {
        email: "",
        name: "",
        age: null,
        isIndian: true,
        phoneno: null,
        uid: "",
      },
      signUpPassword: "",
      confirmPassword: "",
      showSignupModal: false,
    };
  },
  methods: {
    async login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        let uid = firebase.auth().currentUser.uid;
        alert("success");
        this.$router.push({
          path: "/profile/:uid",
          query: { uid: JSON.stringify(uid) },
        });
      } catch (error) {
        alert(error);
      }
    },

    async signUp() {

      this.showSignupModal = false;
      if (this.signUpPassword !== this.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      this.signUpData.age =
        new Date().getFullYear() - new Date(this.signUpData.age).getFullYear();
      if (
        !this.signUpData &&
        !this.signUpData.name &&
        !this.signUpData.age &&
        !this.signUpData.email &&
        !this.signUpData.phoneno &&
        !this.signUpData.email &&
        this.signUpPassword
      ) {
        alert("Enter All Fields");
        return;
      }
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signUpData.email,
            this.signUpPassword
          );
        this.showSignupModal = false;
        this.signUpData.uid = firebase.auth().currentUser.uid;
        let documentPath = "login-details/" + this.signUpData.uid.toString();
        const docRef = db.doc(documentPath);
        let data = (await docRef.get()).data();
        if (!data) {
          docRef.set(this.signUpData);
        } else {
          alert("Data Exist");
        }
        alert("Created");
      } catch (error) {
        alert(error);
      }
    },

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let uid = firebase.auth().currentUser.uid;
          this.$router.push({
            path: "/profile/:uid",
            query: { uid: JSON.stringify(uid) },
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>
<style src="./home.css">
</style>