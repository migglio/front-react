import React from "react";
import "./Form.css";
import Auth from "../Auth.js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import url from "../../../config.js";
import FacebookLogin from "react-facebook-login";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

const NotificationSystem = require("react-notification-system");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      nickname: "",
      formErrors: { nickname: "", password: "" },
      passwordValid: false,
      nicknameValid: false,
      formValid: false,
      errorMssge: null,
      error: false,
      redirect: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processForm = this.processForm.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.redirect = this.redirect.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  notifications = null;

  addNotification = (type, message) => {
    const onRemove = type === "success" ? this.redirect : null;

    this.notifications.addNotification({
      message: message,
      level: type,
      position: "tc",
      autoDismiss: 3,
      onRemove: onRemove
    });
  };

  componentWillMount = () => {
    if (Auth.isUserAuthenticated()) {
      this.redirect();
    }
  };

  componentDidMount = () => {
    this.notifications = this.refs.notificationSystem;
  };

  handleSubmit(event) {
    alert(
      "nickname: " + this.state.nickname + " || pass: " + this.state.password
    );
    event.preventDefault();
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let nicknameValid = this.state.nicknameValid;

    switch (fieldName) {
      case "password":
        passwordValid = value.length >= 1;
        fieldValidationErrors.password = passwordValid ? "" : " is empty";
        break;
      case "nickname":
        nicknameValid = value.length >= 1;
        fieldValidationErrors.nickname = nicknameValid ? "" : " is empty";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid: passwordValid,
        nicknameValid: nicknameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.passwordValid && this.state.nicknameValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  redirect() {
    this.setState({
      redirect: <Redirect to="/" />
    });
  }

  render() {
    return (
      <Paper
        style={{
          width: "25%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: 1,
          marginTop: 15
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            marginTop: "5%",
            width: "70%"
          }}
        >
          <h2>Log In</h2>
          {this.state.redirect}
          <NotificationSystem ref="notificationSystem" />
          <div style={{ margin: "10%" }}>
            <TextField
              id="nickname-text-field"
              label="Nickname"
              name="nickname"
              margin="normal"
              onChange={this.handleUserInput}
            />
            <TextField
              id="password-text-field"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleUserInput}
            />
            <br />
            <Button
              color="primary"
              variant="raised"
              disabled={!this.state.formValid}
              className="bttn"
              onClick={this.processForm}
              style={{ marginTop: 28 }}
              id="login-page-button"
            >
              Login
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: 48, marginBottom: 48 }}>
            <FacebookLogin
              style={{ textAlign: "center", margin: 48 }}
              appId="140609023473072"
              fields="name,email,picture"
              scope="public_profile, email, user_birthday"
              callback={this.responseFacebook}
            />
          </div>
        </div>
      </Paper>
    );
  }

  responseFacebook(res) {
    console.log(res);

    const userData = {
      nickname: res.email,
      password: "password",
      picture: res.picture.data.url,
      name: res.name,
      fbAuth: true
    };

    axios
      .post(url.socket + "auth/login/", userData)
      .then(response => {
        this.setState({
          error: false,
          errorMssge: null
        });
        Auth.authenticateUser(response.data.token);
        Auth.setUserId(response.data.user.id);
        Auth.setNickname(response.data.user.nickname);
        this.addNotification(
          "success",
          "You successfully logged in. You will be redirected to the front page soon"
        );
        this.redirect();
      })
      .catch(error => {
        //let fieldValidationErrors = this.state.formErrors
        const message = error.response.data.message;

        this.addNotification("error", message);

        this.setState({
          error: true,
          errorMssge: message
        });
      });
  }
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const userData = {
      nickname: this.state.nickname,
      password: this.state.password,
      fbAuth: false
    };

    axios
      .post(url.socket + "auth/login/", userData)
      .then(response => {
        this.setState({
          error: false,
          errorMssge: null
        });
        Auth.authenticateUser(response.data.token);
        Auth.setUserId(response.data.user.id);
        Auth.setNickname(response.data.user.nickname);
        this.addNotification(
          "success",
          "You successfully logged in. You will be redirected to the front page soon"
        );
      })
      .catch(error => {
        let fieldValidationErrors = this.state.formErrors;
        const message = error.response.data.message;

        if (message.includes("password")) {
          fieldValidationErrors.password = message;
          this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: false
          });
        } else {
          fieldValidationErrors.nickname = message;
          this.setState({
            formErrors: fieldValidationErrors,
            nicknameValid: false
          });
        }
        this.addNotification("error", message);
        this.addNotification("error", message);

        this.setState({
          error: true,
          errorMssge: message
        });
      });
  }
}

export default Login;
