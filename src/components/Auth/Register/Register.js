import React from "react";
import { FormErrors } from "./FormErrors";
import "./Form.css";
import Auth from "../Auth.js";
import { Redirect } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";
import axios from "axios";
import url from "../../../config";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const NotificationSystem = require("react-notification-system");

class Register extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      nickname: "",
      formErrors: { email: "", nickname: "", password: "" },
      emailValid: false,
      passwordValid: false,
      nicknameValid: false,
      formValid: false,
      error: false,
      errorMssge: null,
      redirect: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processForm = this.processForm.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  notifications = null;

  addNotification = (type, message) => {
    const onRemove = type === "success" ? this.redirect : null;

    this.notifications.addNotification({
      message: message,
      level: type,
      position: "tc",
      autoDismiss: 4,
      onRemove: onRemove
    });
  };

  componentWillMount = () => {
    if (Auth.isUserAuthenticated()) this.redirect();
  };

  componentDidMount = () => {
    this.notifications = this.refs.notificationSystem;
  };

  handleSubmit(event) {
    /*
        const newUser = {
            nickname: this.state.nickname,
            mail: this.state.email,
            password: this.state.password
        }*/
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nicknameValid = this.state.nicknameValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "nickname":
        nicknameValid = value.length >= 3;
        fieldValidationErrors.nickname = nicknameValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nicknameValid: nicknameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.nicknameValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  redirect() {
    this.setState({
      redirect: <Redirect to="/login" />
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
        <form className="demoForm" onSubmit={this.handleSubmit}>
          {this.state.redirect}
          <NotificationSystem ref="notificationSystem" />
          <h2>Sign up</h2>
          <div className="panel panel-default">
            {(this.state.formErrors.email ||
              this.state.formErrors.password ||
              this.state.formErrors.nickname) && (
              <Paper
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: 1,
                  backgroundColor: "#ffa000"
                }}
              >
                <Typography variant="h4" component="h5">
                  <FormErrors formErrors={this.state.formErrors} />
                </Typography>
              </Paper>
            )}
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.email
            )}`}
          >
            <TextField
              label="Email"
              name="email"
              margin="normal"
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </div>

          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.nickname
            )}`}
          >
            <TextField
              label="Nickname"
              name="nickname"
              margin="normal"
              value={this.state.nickname}
              onChange={this.handleUserInput}
            />
          </div>

          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.password
            )}`}
          >
            <TextField
              label="Password"
              name="password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleUserInput}
            />
          </div>
          <Button
            color="primary"
            variant="raised"
            disabled={!this.state.formValid}
            className="bttn"
            onClick={this.processForm}
            style={{ margin: 48 }}
          >
            Sign up
          </Button>
          {this.state.error ? (
            <ListGroupItem bsStyle="danger">
              {this.state.errorMssge}
            </ListGroupItem>
          ) : null}
        </form>
      </Paper>
    );
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const userData = {
      name: this.state.nickname,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url.socket + "auth/signup/", userData, url.config)
      .then(response => {
        this.setState({
          error: false,
          errorMssge: null
        });
        this.addNotification(
          "success",
          "You successfully registered with the nickname " +
            this.state.nickname +
            ". You will be redirected to the login page soon"
        );
      })
      .catch(error => {
        let errorType = null;
        let fieldValidationErrors = this.state.formErrors;

        if (error.response.data.errors.password) {
          errorType = error.response.data.errors.password;
          fieldValidationErrors.password = " is too short";
          this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: false
          });
          this.addNotification("error", "Your password is too short");
        } else {
          errorType = error.response.data.errors.email;
          if (error.response.data.errors.email.includes("mail")) {
            fieldValidationErrors.email = " is already taken";
            this.setState({
              formErrors: fieldValidationErrors,
              emailValid: false
            });
            this.addNotification(
              "error",
              "This mail is already taken : " + this.state.email
            );
          } else {
            fieldValidationErrors.nickname = " is already taken";
            this.setState({
              formErrors: fieldValidationErrors,
              nicknameValid: false
            });
            this.addNotification(
              "error",
              "This nickname is already taken : " + this.state.nickname
            );
          }
        }

        this.setState({
          error: true,
          errorMssge: errorType
        });
      });
  }
}

export default Register;
