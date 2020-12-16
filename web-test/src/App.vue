<template>
  <div id="app">
    <div id="nav" class="">
      <!-- Navigation -->
      <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Welcome</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/">
                <a class="nav-link" href="#">
                  <i class="fa fa-home"></i>
                  Home
                  <span class="sr-only">(current)</span>
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about">
                <a class="nav-link">
                  <i class="fa fa-globe">
                    <span class="badge badge-success">11</span>
                  </i>
                  About Us
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/form">
                <a class="nav-link">
                  <i class="fa fa-wpforms">
                  </i>
                  Form
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fa fa-address-book">
                  <span class="badge badge-danger">11</span>
                </i>
                Contact
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-sign-in">
                  <span class="badge badge-primary">11</span>
                </i>
                Account
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">My Account</a>
                <a class="dropdown-item" href="#">Enter Data</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Sign out</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <!--/.Navbar -->
    </div>
    <router-view />
  
</div>
</template>

 <style  src="./app.css">
 </style>

 <script lang="ts"> 
import { Component, Prop, Vue } from "vue-property-decorator";

export default {
  data() {
    return {};
  },
  methods: {
    toggle() {},
  },
};
 </script> 
