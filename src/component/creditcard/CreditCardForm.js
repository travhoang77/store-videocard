import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
const _ = require("lodash");

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const onSubmit = async (values) => {
//   await sleep(300);
//   window.alert(JSON.stringify(values, 0, 2));
// };

export default class CredditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      readonly: false,
      inputstyle: { background: "#FFF" },
    };
  }

  onSubmit = (values) => {
    console.log(values);

    if (!_.isEmpty(values)) {
      this.props.onAction(values);
      this.setState({ inputstyle: { background: "#CCC" } });
      this.setState({ readonly: true });
    }
  };

  onReset = (form) => {
    form.reset();
    this.setState({ readonly: false });
    this.setState({ inputstyle: { background: "#FFF" } });
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active,
          }) => {
            return (
              <form onSubmit={handleSubmit} className="d-flex flex-row">
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />
                <div className="d-flex flex-column ml-4">
                  <div className="mb-2">
                    <Field
                      style={{ ...this.state.inputstyle }}
                      name="number"
                      component="input"
                      type="text"
                      pattern="[\d| ]{16,22}"
                      placeholder="Card Number"
                      format={formatCreditCardNumber}
                      readOnly={this.state.readonly}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      style={{ ...this.state.inputstyle }}
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Name"
                      readOnly={this.state.readonly}
                    />
                  </div>
                  <div className="d-flex flex-row mb-3">
                    <Field
                      style={{ ...this.state.inputstyle, maxWidth: "3rem" }}
                      name="expiry"
                      component="input"
                      type="text"
                      pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"
                      placeholder="Exp"
                      format={formatExpirationDate}
                      maxlength={5}
                      readOnly={this.state.readonly}
                    />
                    <Field
                      style={{ ...this.state.inputstyle, maxWidth: "3rem" }}
                      className="ml-2"
                      name="cvc"
                      component="input"
                      type="text"
                      pattern="\d{3,4}"
                      placeholder="CVC"
                      format={formatCVC}
                      readOnly={this.state.readonly}
                    />
                  </div>
                  <div className="buttons d-flex flex-row">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="ml-2 btn btn-primary"
                      onClick={(event) => this.onReset(form)}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                {/* <h2>Values</h2>
                <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              </form>
            );
          }}
        />
      </div>
    );
  }
}
