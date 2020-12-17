<template>
  <div class="profile">
    <!-- p -   {{ firebaseData }} -->
    <div v-if="isAuthorized">
      <!-- {{ firebaseData }} -->
      Firebase Yo YO
      <br />
      <h1>Welcome - {{ userData.name }}</h1>
      <h1>Age - {{ userData.age }}</h1>
      <h1>Email - {{ userData.email }}</h1>
      <h1>Is Indian - {{ userData.name ? "Yes" : "No" }}</h1>
      <h1>Phone Number - {{ userData.phoneno }}</h1>
    </div>
    <div v-if="isGoogleUser">
      <h1>
        Google User
        <img alt="Profile Pic" :src="googleLoginData.photoID" />
      </h1>
      <h1>Welcome - {{ googleLoginData.name }}</h1>
      <h1>Email - {{ googleLoginData.email }}</h1>
      <h1>Phone Number - {{ googleLoginData.phoneno }}</h1>
    </div>
    <div v-if="!isGoogleUser && !isAuthorized">
      <h1>NIKAL LAVRE</h1>
    </div>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script >
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import { db } from "./../firebase";

// const documentPath = "login-details/5xyckXTNdibafaNWAkVUkJgj5sq2";
export default {
  data() {
    return {
      uid: "",
      isAuthorized: false,
      firebaseData: null,
      userData: {},
      isGoogleUser: false,
      googleLoginData: {
        email: "",
        name: "",
        photoURL: "",
        uid: "",
        phoneno: "",
      },
    };
  },
  methods: {
    async signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        });
    },
  },

  created: async function () {
    this.uid = firebase.auth().currentUser.uid;
    const uidRoute = JSON.parse(this.$route.query.uid);

    if (uidRoute == this.uid) {
      this.isAuthorized =
        firebase.auth().currentUser.providerData[0].providerId == "password"
          ? true
          : false;
      this.isGoogleUser =
        firebase.auth().currentUser.providerData[0].providerId == "google.com"
          ? true
          : false;
    }

    if (this.isGoogleUser) {
      this.googleLoginData.photoID = firebase.auth().currentUser.providerData[0]
        .photoURL
        ? firebase.auth().currentUser.providerData[0].photoURL
        : "Not Present";
      this.googleLoginData.uid = this.uid;
      this.googleLoginData.email = firebase.auth().currentUser.providerData[0].email;
      this.googleLoginData.name = firebase.auth().currentUser.providerData[0].displayName;
      this.googleLoginData.photoURL = firebase.auth().currentUser
        .providerData[0].photoURL
        ? firebase.auth().currentUser.providerData[0].photoURL
        : "Not Present";
      this.googleLoginData.phoneno = firebase.auth().currentUser.providerData[0]
        .phoneno
        ? firebase.auth().currentUser.providerData[0].phoneno
        : "Not Present";
    }

    let documentPath = "login-details/" + this.uid.toString();
    const docRef = db.doc(documentPath);
    let data = (await docRef.get()).data();
    if (!data) {
      docRef.set(this.isGoogleUser? this.googleLoginData : this.userdata);
    } else {
      alert("User Logged in before");
    }
    this.userData = data ? data : {};
  },
};
</script>
<style src="./home.css">
</style>