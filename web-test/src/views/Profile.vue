<template>
  <div class="profile">
    <!-- p -   {{ firebaseData }} -->
    <div v-if="isAuthorized">
      <!-- {{ firebaseData }} -->
      Firebase
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
        <img alt="Profile Pic" :src="userData.photoID" />
      </h1>
      <h1>Welcome - {{ userData.name }}</h1>
      <h1>Email - {{ userData.email }}</h1>
      <h1>Phone Number - {{ userData.phoneno }}</h1>
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
    let documentPath = "login-details/" + this.uid.toString();
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
    const docRef = db.doc(documentPath);
    let data = (await docRef.get()).data();
    this.userData = data ? data : {};
    if (this.isGoogleUser) {
      this.userData.photoID = firebase.auth().currentUser.providerData[0]
        .photoURL
        ? firebase.auth().currentUser.providerData[0].photoURL
        : "Not Present";
    }
  },
};
</script>
<style src="./home.css">
</style>