import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "moment-timezone";
import useForm from "javascript/useForm";
import validate from "javascript/validate";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import { apiLocal } from "javascript/dataGlobal.js";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
} from "reactstrap";

// core components

function Register() {
  const dispatch = useDispatch();
  const errRegister = useSelector((state) => state.errRegister);

  let location = useLocation();
  let history = useHistory();
  const {
    valuesRegister,
    errorsRegister,
    handleChangeRegister,
    handleSubmitRegister,
  } = useForm(register, validate);

  async function register() {
    Promise.all([
      axios.post(`${apiLocal}/api/users/register`, {
        name: valuesRegister.name,
        username: valuesRegister.username,
        email: valuesRegister.email,
        password: valuesRegister.password,
      }),
    ])
      .then(() => {
        dispatch(action.setErrRegister(false));
        dispatch(action.setToken(true));
        dispatch(action.setEmail(valuesRegister.email));
        history.push("/schools");
        // history.push("/login");
      })
      .catch((err) => {
        if (err) dispatch(action.setErrRegister(true));
      });
  }

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passFocus, setPassFocus] = React.useState(false);
  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage:
            "url(" + require("assets/img/bg11.jpg").default + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px",
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form
                onSubmit={handleSubmitRegister}
                action="submit"
                className="form"
                method=""
              >
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Đăng ký
                  </CardTitle>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxlength="20"
                      value={valuesRegister.name || ""}
                      name="name"
                      required
                      onChange={handleChangeRegister}
                      placeholder="Tên..."
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                  {errorsRegister.name && (
                    <p className="help is-danger">{errorsRegister.name}</p>
                  )}
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      maxlength="20"
                      value={valuesRegister.username || ""}
                      name="username"
                      required
                      onChange={handleChangeRegister}
                      placeholder="Tên người dùng..."
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    ></Input>
                  </InputGroup>
                  {errorsRegister.username && (
                    <p className="help is-danger">{errorsRegister.username}</p>
                  )}
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      onChange={handleChangeRegister}
                      value={valuesRegister.email || ""}
                      name="email"
                      placeholder="Địa chỉ email..."
                      type="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></Input>
                  </InputGroup>
                  {errorsRegister.email && (
                    <p className="help is-danger">{errorsRegister.email}</p>
                  )}
                  <InputGroup
                    className={
                      "no-border" + (passFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      onChange={handleChangeRegister}
                      value={valuesRegister.password || ""}
                      name="password"
                      placeholder="Mật khẩu..."
                      type="password"
                      onFocus={() => setPassFocus(true)}
                      onBlur={() => setPassFocus(false)}
                    ></Input>
                  </InputGroup>
                  {errorsRegister.password && (
                    <p className="help is-danger">{errorsRegister.password}</p>
                  )}
                  {errRegister && (
                    <p className="help is-danger">
                      Tài khoản sai hoặc đã tồn tại
                    </p>
                  )}
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    size="lg"
                    style={{ marginBottom: "0" }}
                  >
                    Đăng ký
                  </Button>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link to="/" style={{ margin: "0 10px 0 0 " }}>
                      Đăng nhập ẩn danh
                    </Link>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              to="/login"
              outline
              size="lg"
              tag={Link}
            >
              Đăng nhập tại đây
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Register;
