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
    <div v-else>
      <h1>NIKAL LAVRE</h1>
    </div>
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
    };
  },
  methods: {
    async login() {},
  },

  created: async function () {
    this.uid = firebase.auth().currentUser.uid;
    const uidRoute = JSON.parse(this.$route.query.uid);
    let documentPath = "login-details/" + this.uid.toString()
    const docRef = db.doc(documentPath);
    let data = (await docRef.get()).data();
    if (uidRoute == this.uid) {
      this.isAuthorized = true;
    }
    this.userData = data;
  },
};
</script>
<style src="./home.css">
</style>