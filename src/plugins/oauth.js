"use strict";

import Vue from "vue";
import GAuth from "vue-google-oauth2";

Vue.use(GAuth, {
  clientId: "491312871953-2kfcfmj5v4vj0uj3rp2r2gp2cfmljjrm.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
});
