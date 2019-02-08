import React from 'react'
import FormService from '../../services/FormService'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserFormsList from './UserFormsList'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PreviewRender from './PreviewRender'
import { object } from 'prop-types';
const clone = require("clone");

class ScholarshipFundApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formId: "",
            title: "",
            userId: 0,
            description: "",
            version: "",
            formFieldsArr: [],
            dataArr: [],
            checkedArr: [],
            radioArr: [],
            pagedItems: [],
            progressArr: [],
            modal: false,
            showSuccess: false,
            showError: false
        }
    }

    componentDidMount() {
        this.setState({
            userId: this.props.user.user.id
        }, () => FormService.selectFormsByUserId(this.onSuccess, this.onError)
        )
    }
    onSuccess = response => {
        this.setState({
            pagedItems: response.data.items
        })
    }
    open = props => {
        FormService.getFormProgress(props, this.onProgressSuccess, this.onProgressError)
        const { formId } = props
        this.setState({ formId: props }, () =>
            FormService.selectFormById(
                props,
                this.selectFormSuccess,
                this.selectFormError
            )

        );
    }

    onProgressSuccess = resp => {
        this.setState({
            progressArr: resp.data.items
        }, () => { console.log(this.state.progressArr) })
    }

    onProgressError = err => {
    }

    deleteForm = id => {
        FormService.deleteUserForm(id, this.onUserFormSuccess, this.onUserFormDelete)
    }

    onUserFormSuccess = resp => {
        window.location.reload();
    }

    onUserFormError = err => {
    }

    onChange = evt => {
        const arrIndex = evt.target.getAttribute("index");
        const cloneDataArr = clone(this.state.dataArr);
        const checkedArr = clone(this.state.checkedArr);
        const radioArr = clone(this.state.radioArr);
        if (evt.target.type === "checkbox") {
            const nestidx = evt.target.getAttribute("nestidx");
            const isChecked = checkedArr[arrIndex].nest[nestidx].value;
            if (isChecked === "unchecked" || evt.target.title !== "checked" && (isChecked === "" || checkedArr[arrIndex].nest[nestidx].value === "" || checkedArr[arrIndex].nest[nestidx].value === "unchecked")) {
                checkedArr[arrIndex].nest[nestidx].value = "checked";
                console.log("=====THIS IS THE FIRST CHECK", isChecked)
                checkedArr[arrIndex].nest[nestidx].inputControlId = parseInt(
                    evt.target.id
                );
                let dataObj = {
                    userId: this.state.userId,
                    nest: checkedArr[arrIndex].nest,
                    formId: this.state.formId
                };
                cloneDataArr[arrIndex] = dataObj;
                this.setState({ checkedArr: checkedArr });
            } else {
                if (evt.target.title == "checked" || isChecked !== "" || checkedArr[arrIndex].nest[nestidx].value !== "" || checkedArr[arrIndex].nest[nestidx].value !== "unchecked") {
                    checkedArr[arrIndex].nest[nestidx].value = "unchecked";
                    console.log("=====THIS IS THE SECOND CHECK", isChecked)
                } else {
                    checkedArr[arrIndex].nest[nestidx].value = "checked";
                    console.log("=====THIS IS THE third CHECK", checkedArr[arrIndex].nest[nestidx].value)
                }
                let dataObj = {
                    userId: this.state.userId,
                    nest: checkedArr[arrIndex].nest,
                    formId: this.state.formId
                };
                cloneDataArr[arrIndex] = dataObj;
                this.setState({ checkedArr: checkedArr });
            }
        } else if (evt.target.type === "radio") {
            const nestidx = evt.target.getAttribute("nestidx");
            radioArr[arrIndex].nest[nestidx].value = evt.target.value;
            let dataObj = {
                userId: this.state.userId,
                nest: radioArr[arrIndex].nest,
                formId: this.state.formId
            };
            cloneDataArr[arrIndex] = dataObj;
        } else {
            const dataObj = {
                inputControlId: parseInt(evt.target.id),
                userId: this.state.userId,
                value: evt.target.value,
                formId: this.state.formId
            };
            cloneDataArr[arrIndex] = dataObj;
        }
        this.setState({ dataArr: cloneDataArr });
    };

    selectFormSuccess = resp => {
        const item = resp.data.item;
        this.setState(
            {
                title: item.title,
                formId: item.id,
                description: item.description,
                version: `v${item.version}`
            },
            () =>
                FormService.selectByFormId(
                    this.state.formId,
                    this.inputControlSuccess,
                    this.inputControlError
                )
        );
    };

    selectFormError = err => {
        this.setState({ showError: true });
    };

    inputControlSuccess = resp => {
        const cloneArr = [];
        const progressArr = this.state.progressArr.map(Id => Id.inputControlId);
        const progressArrVal = this.state.progressArr.map(val => val.value);
        const { title, description, version, formId } = this.state;
        resp.data.map(data => {
            if (data.items.length === 1) {
                data.items.map(item => {
                    cloneArr.push(item);
                });
            } else {
                const dataArr = [];
                const placeholderArr = [];
                data.items.map(item => {
                    dataArr.push(item);
                    const tempObj = {
                        inputControlId: item.inputControlId,
                        userId: this.state.userId,
                        formId: formId
                    };
                    placeholderArr.push(tempObj);
                });
                const dataObj = {
                    title: title,
                    description: description,
                    version: version,
                    position: data.position,
                    options: dataArr
                };
                for (var i = 0; i < dataArr.length; i++) {
                    placeholderArr[i].value = "";
                }
                const cloneChecked = clone(this.state.checkedArr);
                cloneChecked[data.position] = { nest: placeholderArr };
                const radioSelected = clone(this.state.radioArr);
                radioSelected[data.position] = { nest: placeholderArr };
                if (data.items[0].type === "checkbox") {
                    this.setState({ checkedArr: cloneChecked });
                    cloneArr.push(dataObj);
                } else {
                    this.setState({ radioArr: radioSelected });
                    cloneArr.push(dataObj);
                }
            }
        });
        this.setState({ formFieldsArr: cloneArr, modal: true })
            ;
    };

    inputControlError = err => {
        this.setState({ showError: true, modal: true });
    };

    cancelBack = () => {
        this.setState({
            modal: false
        })
        this.props.history.push("/forms");
    };

    saveFormData = () => {
        const { dataArr } = this.state;
        const { formFieldsArr } = this.state;
        dataArr.map(data => {
            if (data.nest) {
                data.nest.map(child => {
                    FormService.formDataInsert(
                        child,
                        this.formDataSuccess,
                        this.formDataError
                    );
                });
            } else {
                if (dataArr.length < formFieldsArr.length) {
                    this.setState({
                        showError: true
                    })
                } else {
                    FormService.formDataInsert(
                        data,
                        this.formDataSuccess,
                        this.formDataError
                    );
                }
            }
        });
    };

    formDataSuccess = (resp) => {
        this.setState({
            showSuccess: true,
            dataArr: []
        }, () => FormService.deleteformProgress(this.state.formId, this.onDeleteSuccess, this.onDeleteError));
    };

    onDeleteSuccess = resp => {
    }

    onDeleteError = err => {
    }

    formDataError = err => {
        this.setState({ showError: true });
    };

    redirectData = () => {
        this.setState({
            modal: false,
            showSuccess: false
        })
        this.props.history.push("/forms");
    };

    closeError = () => {
        this.setState({ showError: false });
    };

    saveProgress = evt => {
        const { dataArr } = this.state;
        dataArr.map(data => {
            if (data.nest) {
                data.nest.map(child => {
                    FormService.saveFormProgress(
                        child,
                        this.formProgressSuccess,
                        this.formProgressError
                    );
                });
            } else {
                FormService.saveFormProgress(
                    data,
                    this.formProgressSuccess,
                    this.formProgressError
                );
            }
        });
    }

    formProgressSuccess = resp => {
        this.redirectData()
    }

    formProgressError = err => {
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>
                        <button onClick={this.saveProgress}>Save Progress</button>
                    </ModalHeader>
                    <ModalBody>
                        <PreviewRender
                            {...this.state}
                            cancelBack={this.cancelBack}
                            onChange={this.onChange}
                            saveFormData={this.saveFormData}
                            redirectData={this.redirectData}
                            showSuccess={this.state.showSuccess}
                            closeError={this.closeError}
                        />
                    </ModalBody>
                </Modal>
                <span className="text-muted font-weight-light">Forms</span>
                <div className="table-responsive">
                    <table className="datatables-demo table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Title </th>
                                <th> Description </th>
                                <th> Version</th>
                                <th> Open</th>
                                <th> Delete</th>
                            </tr>
                        </thead>
                        {this.state.pagedItems.map((para) => {
                            if (para == null) {
                                return <UserFormsList
                                />
                            } else {
                                return <UserFormsList
                                    key={para.id}
                                    id={para.id}
                                    title={para.title}
                                    description={para.description}
                                    version={para.version}
                                    delete={this.deleteForm}
                                    open={this.open}
                                />
                            }
                        })}
                    </table>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.UserReducer
    }
}



export default withRouter(connect(mapStateToProps)(ScholarshipFundApplication))