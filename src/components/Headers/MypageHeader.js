import React, { useRef } from "react";
import { useSelector } from "react-redux";

// reactstrap components
import { Container } from "reactstrap";

// core components

function MypageHeader({ re, cmt }) {
  const user = useSelector((state) => state.user);
  // let pageHeader = useRef();

  // React.useEffect(() => {
  //   if (window.innerWidth > 991 && pageHeader.current) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={
            user.coverImg
              ? {
                  backgroundImage: "url(" + user.coverImg + ")",
                }
              : {
                  backgroundImage:
                    "url(" + require("assets/img/bg5.jpg").default + ")",
                }
          }
          // ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img
              alt="..."
              src={
                user.avatar || require("assets/img/default-avatar.png").default
              }
            ></img>
          </div>
          <p className={`${user.banned ? "" : "hidden"}`}>
            Tài khoản đã bị chặn
          </p>
          <h3 className="title">{user.name}</h3>
          <div className="content">
            <div className="social-description text-after-loading-re">
              {re.length ? (
                <h2>{re.length}</h2>
              ) : (
                <i
                  style={{ fontSize: "32px !important" }}
                  id={`loading_1_${user.id}`}
                  className="now-ui-icons loader_refresh spin"
                ></i>
              )}
              <p>Số bài đánh giá</p>
            </div>
            <div className="social-description text-after-loading-cmt">
              {cmt.length ? (
                <h2>{cmt.length}</h2>
              ) : (
                <i
                  style={{ fontSize: "32px !important" }}
                  id={`loading_2_${user.id}`}
                  className="now-ui-icons loader_refresh spin"
                ></i>
              )}
              <p>Số lượt bình luận</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default MypageHeader;
