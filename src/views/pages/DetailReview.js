import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";
import Loading from "components/loading/Loading.js";
import * as func from "javascript/funcGlobal.js";
import * as rb from "react-bootstrap";
import ListComment from "components/comments/ListComment";
// reactstrap components
// import {
// } from "reactstrap";

import CustomNavbar from "components/Navbars/CustomNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import Review from "components/review/Review";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";

function DetailReview() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const listCmt = useSelector((state) => state.cmt);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}`)])
        .then(([review, comment]) => {
          setReview(review.data);
          setLoading(false);
        })
        .catch(() => history.push("/error"));
    };
    axiosData();
  }, [params.id]);
  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div className="main">
          <Review item={review}></Review>
          <div
            className="n-cmt"
            style={{
              paddingBottom: "8px",
              width: "100%",
            }}
          >
            {listCmt.length} comments
          </div>
          <ListComment></ListComment>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default DetailReview;
