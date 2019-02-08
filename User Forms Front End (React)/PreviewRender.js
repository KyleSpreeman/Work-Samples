import React from "react";
import TextInput from "../../common/TextInput";
import MaskedInput from "react-text-mask";
import SweetAlert from "react-bootstrap-sweetalert";
import { ObjectUnsubscribedError } from "rxjs";

const PreviewRender = props => {
  console.log(props)
  return (
    <React.Fragment>
      <h2>{props && `${props.title} ${props.version}`}</h2>
      <SweetAlert
        success
        show={props.showSuccess}
        allowEscape={false}
        closeOnClickOutside={false}
        confirmBtnText="OK"
        confirmBtnBsStyle="primary"
        title="Form Submitted"
        onConfirm={props.redirectData}
      />
      <SweetAlert
        danger
        show={props.showError}
        allowEscape={false}
        closeOnClickOutside={false}
        confirmBtnText="OK"
        confirmBtnBsStyle="default"
        title="Oops"
        onConfirm={props.closeError}
      >
        Something went wrong. Please try again.
      </SweetAlert>
      <div className="form">
        {props.formFieldsArr.map((field, index) => {
          if (field.options) {
            return (
              <div className="col-lg-6 offset-lg-3" key={index}>
                <div className="form-group">
                  {field.options.map((nest, idx) => {
                    if (nest.type === "checkbox") {
                      let object = props.progressArr.find(x => x.inputControlId === nest.inputControlId)
                      if (object === undefined) {
                        return (
                          <React.Fragment key={idx}>
                            {idx === 0 && (
                              <label className="form-label" htmlFor={nest.name}>
                                {nest.label}
                              </label>
                            )}
                            <div className="form-check">
                              <input
                                defaultChecked={(props.checkedArr[index].nest[idx].value == "unchecked") || (props.checkedArr[index].nest[idx].value == "unchecked")}
                                index={index}
                                nestidx={idx}
                                className="form-check-input input-md"
                                style={{ display: "inline-flex" }}
                                name={nest.name}
                                type={nest.type}
                                onChange={props.onChange}
                                id={nest.inputControlId}
                                value={props.checkedArr[index].nest[idx].value}
                              />
                              <label className="form-check-label">
                                {nest.name}
                              </label>
                            </div>
                          </React.Fragment>
                        )
                      } else {
                        let object = props.progressArr.find(x => x.inputControlId === nest.inputControlId)
                        if (props.progressArr.length <= 1 && props.checkedArr[index].nest[idx].value == "unchecked") {
                          return (
                            <React.Fragment key={idx}>
                              {idx === 0 && (
                                <label className="form-label" htmlFor={nest.name}>
                                  {nest.label}
                                </label>
                              )}
                              <div className="form-check">
                                <input
                                  defaultChecked={(props.checkedArr[index].nest[idx].value == "" && object.value == "unchecked") || (props.checkedArr[index].nest[idx].value == "unchecked")}
                                  index={index}
                                  nestidx={idx}
                                  className="form-check-input input-md"
                                  style={{ display: "inline-flex" }}
                                  name={nest.name}
                                  type={nest.type}
                                  onChange={props.onChange}
                                  id={nest.inputControlId}
                                  value={props.checkedArr[index].nest[idx].value}
                                />
                                <label className="form-check-label">
                                  {nest.name}
                                </label>
                              </div>
                            </React.Fragment>
                          )
                        } if (object.value == "checked") {
                          let object = props.progressArr.find(x => x.inputControlId === nest.inputControlId)
                          return (
                            <React.Fragment key={idx}>
                              {idx === 0 && (
                                <label className="form-label" htmlFor={nest.name}>
                                  {nest.label}
                                </label>
                              )}
                              <div className="form-check">
                                <input
                                  checked={(props.checkedArr[index].nest[idx].value == "" && object.value == "checked") || (props.checkedArr[index].nest[idx].value == "checked")}
                                  index={index}
                                  nestidx={idx}
                                  title={object.value}
                                  className="form-check-input input-md"
                                  style={{ display: "inline-flex" }}
                                  name={nest.name}
                                  type={nest.type}
                                  onChange={props.onChange}
                                  id={nest.inputControlId}
                                  value={props.checkedArr[index].nest[idx].value}
                                />
                                <label className="form-check-label">
                                  {nest.name}
                                </label>
                              </div>
                            </React.Fragment>
                          )
                        } else {
                          console.log("this is the unchecked render")
                          return (
                            <React.Fragment key={idx}>
                              {idx === 0 && (
                                <label className="form-label" htmlFor={nest.name}>
                                  {nest.label}
                                </label>
                              )}
                              <div className="form-check">
                                <input
                                  defaultChecked={(props.checkedArr[index].nest[idx].value !== "" && object.value !== "checked") || (props.checkedArr[index].nest[idx].value == "checked")}
                                  index={index}
                                  nestidx={idx}
                                  className="form-check-input input-md"
                                  style={{ display: "inline-flex" }}
                                  name={nest.name}
                                  type={nest.type}
                                  onChange={props.onChange}
                                  id={nest.inputControlId}
                                  value={props.checkedArr[index].nest[idx].value}
                                />
                                <label className="form-check-label">
                                  {nest.name}
                                </label>
                              </div>
                            </React.Fragment>
                          )
                        }
                      };
                    } else if (nest.type === "radio") {
                      let object = props.progressArr.find(x => x.inputControlId === nest.inputControlId)
                      if (object == undefined) {
                        let object = props.progressArr.find(x => x.inputControlId === nest.inputControlId)
                        return (
                          <React.Fragment key={idx}>
                            {idx === 0 && (
                              <label className="form-label" htmlFor={nest.name}>
                                {nest.label}
                              </label>
                            )}
                            <div className="form-check">
                              <input
                                index={index}
                                className="form-check-input input-md"
                                style={{ display: "inline-flex" }}
                                name={nest.label}
                                type={nest.type}
                                value={nest.name}
                                nestidx={idx}
                                onChange={props.onChange}
                                id={nest.inputControlId}
                              />
                              <label className="form-check-label">
                                {nest.name}
                              </label>
                            </div>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={idx}>
                            {idx === 0 && (
                              <label className="form-label" htmlFor={nest.name}>
                                {nest.label}
                              </label>
                            )}
                            <div className="form-check">
                              <input
                                index={index}
                                defaultChecked={object.value}
                                className="form-check-input input-md"
                                style={{ display: "inline-flex" }}
                                name={nest.label}
                                type={nest.type}
                                value={nest.name}
                                nestidx={idx}
                                onChange={props.onChange}
                                id={nest.inputControlId}
                              />
                              <label className="form-check-label">
                                {nest.name}
                              </label>
                            </div>
                          </React.Fragment>
                        );
                      }
                    }
                  })}
                </div>
              </div>
            );
          } else {
            if (field.type === "text" || field.type === "date") {
              if (props.progressArr.length === 0) {
                return (<div className="col-lg-6 offset-lg-3" key={index}>
                  <TextInput
                    index={index}
                    id={field.inputControlId}
                    name={field.name.replace(/\s/g, "").toLowerCase()}
                    label={field.label}
                    type={field.type}
                    onChange={props.onChange}
                  />
                </div>)
              } else {
                let object = props.progressArr.find(x => x.inputControlId === field.inputControlId)
                if (object === undefined) {
                  return (<div className="col-lg-6 offset-lg-3" key={index}>
                    <TextInput
                      index={index}
                      id={field.inputControlId}
                      name={field.name.replace(/\s/g, "").toLowerCase()}
                      label={field.label}
                      type={field.type}
                      onChange={props.onChange}
                    />
                  </div>)
                } else {
                  let object = props.progressArr.find(x => x.inputControlId === field.inputControlId)
                  return (
                    <div className="col-lg-6 offset-lg-3" key={index}>
                      <TextInput
                        index={index}
                        defaultValue={object.value}
                        id={field.inputControlId}
                        name={field.name.replace(/\s/g, "").toLowerCase()}
                        label={field.label}
                        type={field.type}
                        onChange={props.onChange}
                      />
                    </div>
                  )
                };
              }
            } else {
              let object = props.progressArr.find(x => x.inputControlId === field.inputControlId)
              if (props.progressArr.length === 0 || object == undefined) {
                return (
                  <div className=" col-lg-6 offset-lg-3">
                    <label className="form-label" htmlFor={field.label}>
                      {field.label}
                    </label>
                    <MaskedInput
                      index={index}
                      name="phoneNumber"
                      className="form-control"
                      id={field.inputControlId}
                      onChange={props.onChange}
                      guide={true}
                      showMask={true}
                      mask={[
                        "(",
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                    />
                  </div>
                );
              } else {
                let object = props.progressArr.find(x => x.inputControlId === field.inputControlId)
                return (
                  <div className=" col-lg-6 offset-lg-3">
                    <label className="form-label" htmlFor={field.label}>
                      {field.label}
                    </label>
                    <MaskedInput
                      index={index}
                      name="phoneNumber"
                      className="form-control"
                      id={field.inputControlId}
                      defaultValue={object.value}
                      onChange={props.onChange}
                      guide={true}
                      showMask={true}
                      mask={[
                        "(",
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                    />
                  </div>
                );
              }
            }
          }
        })}
        <button
          type="button"
          className="btn btn-clear"
          onClick={props.cancelBack}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary float-right"
          onClick={props.saveFormData}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default PreviewRender;
