import React from "react";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

export default class CredditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
    };
  }

  onSubmit = () => {
    alert("submit");
  };
  render() {
    return (
      <div>
        <Form
          onSubmit={onSubmit}
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
                      name="number"
                      component="input"
                      type="text"
                      pattern="[\d| ]{16,22}"
                      placeholder="Card Number"
                      format={formatCreditCardNumber}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="d-flex flex-row mb-3">
                    <Field
                      style={{ maxWidth: "3rem" }}
                      name="expiry"
                      component="input"
                      type="text"
                      pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"
                      placeholder="Exp"
                      format={formatExpirationDate}
                      maxlength={5}
                    />
                    <Field
                      style={{ maxWidth: "3rem" }}
                      className="ml-2"
                      name="cvc"
                      component="input"
                      type="text"
                      pattern="\d{3,4}"
                      placeholder="CVC"
                      format={formatCVC}
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
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <h2>Values</h2>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
