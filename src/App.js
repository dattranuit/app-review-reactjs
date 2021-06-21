/*

=========================================================
* Now UI Kit React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import "./index.css";
import Index from "views/Index.js";
import Avatar from "components/avatar/Avatar.js";
import ErrPage from "views/pages/Error.js";
import Schools from "views/pages/Schools.js";
import MyPage from "views/pages/MyPage.js";
import DetailReview from "views/pages/DetailReview.js";
import ReviewPage from "views/pages/Review.js";
import Register from "views/pages/Register.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/pages/LoginPage.js";
import LandingPage from "views/pages/LandingPage.js";
import ProfilePage from "views/pages/ProfilePage.js";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AppContainer from "views/AppContainer.js";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";

const App = () => {
  const dispatch = useDispatch();
  const arrId = useSelector((state) => state.arrId);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([
        axios.get(`${apiLocal}/api/schools`),
        axios.get(`${apiLocal}/api/reviews`),
        axios.get(`${apiLocal}/api/comments`),
        axios.get(`${apiLocal}/api/users`),
      ])
        .then(([schools, reviews, comments, users]) => {
          dispatch(
            action.setIdApp({
              schools: schools.data.map((school) => school._id),
              reviews: reviews.data.map((review) => review._id),
              comments: comments.data.map((cmt) => cmt._id),
              users: users.data.map((user) => user._id),
            })
          );
        })
        .catch();
    };
    axiosData();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/avatar" render={(props) => <Avatar {...props} />} />
        <Route
          exact
          path="/schools/:id/reviews/:id/detail"
          render={(props) => <DetailReview {...props} />}
        />
        <Route exact path="/mypage" render={(props) => <MyPage {...props} />} />
        <Route
          exact
          path="/schools/:id/reviews"
          render={(props) => <ReviewPage {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Route
          exact
          path="/schools"
          render={(props) => <Schools {...props} />}
        />
        <Route exact path="/" render={(props) => <Index {...props} />} />
        <Route
          exact
          path="/icon"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          exact
          path="/landing"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          exact
          path="/profile/:id"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <LoginPage {...props} />}
        />
        <Route component={ErrPage}></Route>
      </Switch>
    </>
  );
};

export default App;
