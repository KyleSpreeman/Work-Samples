import React from 'react'
import RolesGetAllForm from './RolesGetAllForm'
import RolesSearchForm from './RolesSearchForm'
import RolesService from '../services/RolesService'
import RolesPagination from './RolesPagination'
import { DebounceInput } from 'react-debounce-input'
import SweetAlert from 'react-bootstrap-sweetalert'
import { addSeconds } from 'date-fns';

class Roles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagedItems: [],
            searchTerm: "",
            pageSize: 10,
            pageNumber: 1,
            sweetAlertAddShow: false,
            sweetAlertRemoveShow: false
        }
    }

    componentDidMount = () => {
        let data = {
            pageSize: parseInt(this.state.pageSize),
            pageNumber: parseInt(this.state.pageNumber)
        }
        this.filterUsers()
    }

    onSelectAllSuccess = response => {
        this.setState({
            pagedItems: response.data.items

        })
    }

    onSelectAllError = err => {
    }

    onChange = (evt) => {
        let key = evt.target.name
        let val = evt.target.value
        this.setState({
            [key]: val,
            pageNumber: 1
        }, () => this.filterUsers())
    }

    filterUsers = items => {
        let data = {
            searchTerm: this.state.searchTerm,
            pageSize: parseInt(this.state.pageSize),
            pageNumber: parseInt(this.state.pageNumber)
        }
        console.log(data)
        RolesService.search(data, this.onSearchSuccess, this.onSearchError)
    }

    onSearchSuccess = response => {
        console.log(response)
        let items = response.data.items
        this.setState({
            pagedItems: items
        })
    }

    onSearchError = err => {
    }
    checkChange = (evt) => {
        let key = evt.target.name
        let val = evt.target.value
        const userid = evt.target.id
        const roleIdMap = {
            'superAdmin': 1,
            'implementer': 2,
            'fundingSourceAdmin': 3,
            'schoolNgoAdmin': 4,
            'fundingSourceDirector': 5,
            'schoolNgoDirector': 6,
            'fundingSourceCaseManager': 7,
            'schoolNgoCaseManager': 8,
            'studentClient': 9,
        }
        const RoleId = roleIdMap[key]
        if (val == 0) {
            const data = {
                RoleId: RoleId,
                UserId: parseInt(evt.target.id)
            }
            RolesService.createRole(data, this.onCreateSuccess, this.onCreateError)
            this.setState({
                sweetAlertAddShow: true
            })
        } else {
            const data = {
                RoleId: RoleId,
                UserId: parseInt(evt.target.id)
            }
            RolesService.deleteRole(data, this.onDeleteSuccess, this.onDeleteError)
            this.setState({
                sweetAlertRemoveShow: true
            })
        }
    }

    onCreateSuccess = resp => {
        this.filterUsers()
    }
    onCreateError = err => {
    }
    onDeleteSuccess = resp => {
        this.filterUsers()
    }

    onDeleteError = err => {
        console.log(err)
    }

    pageNext = evt => {
        if (this.state.pagedItems.length <= 0) {
            this.setState({
                disable: true,
            })
        } else {
            if (this.state.searchTerm !== "" || this.state.levelSearch !== "") {
                console.log("this is firing")
                this.setState({
                    pageNumber: this.state.pageNumber + 1
                }, () => this.filterUsers())
            } else {
                this.setState({
                    pageNumber: this.state.pageNumber + 1
                }, () => this.filterUsers())
            }
        }
    }

    pagePrevious = evt => {
        if (this.state.pageNumber == 1) {
            this.setState({
                disable: true
            })
        } else {
            if (this.state.searchTerm !== "" || this.state.levelSearch !== "") {
                this.setState({
                    pageNumber: this.state.pageNumber - 1
                }, () => this.filterUsers())
            } else {
                this.setState({
                    disable: false,
                    pageNumber: this.state.pageNumber - 1
                }, () => this.filterUsers())
            }
        }
    }

    sweetAlertHide = sweet => {
        this.setState({
            sweetAlertAddShow: false,
            sweetAlertRemoveShow: false
        })
    }

    render() {
        return (
            <div>
                <div className="container-fluid flex-grow-1 container-p-y">
                    <h4 className="font-weight-bold py-3 mb-4">Roles</h4>
                    <RolesSearchForm
                        onChange={this.onChange}
                        pageSize={this.state.pageSize}
                        searchTerm={this.state.searchTerm} />
                    <div className="table-responsive">
                        <table className="datatables-demo table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Super Admin</th>
                                    <th>Implementer</th>
                                    <th>Funding Source Admin</th>
                                    <th>School NGO Admin</th>
                                    <th>Funding Source Director</th>
                                    <th>School NGO Director</th>
                                    <th>Funding Source Case Manager</th>
                                    <th>School NGO Case Manager</th>
                                    <th>Student Client</th>
                                </tr>
                            </thead>
                            {this.state.pagedItems.map((para) => {
                                return <RolesGetAllForm
                                    userId={para.userId}
                                    firstName={para.firstName}
                                    lastName={para.lastName}
                                    email={para.email}
                                    superAdmin={para.superAdmin}
                                    implementer={para.implementer}
                                    fundingSourceAdmin={para.fundingSourceAdmin}
                                    schoolNgoAdmin={para.schoolNgoAdmin}
                                    fundingSourceDirector={para.fundingSourceDirector}
                                    schoolNgoDirector={para.schoolNgoDirector}
                                    fundingSourceCaseManager={para.fundingSourceCaseManager}
                                    schoolNgoCaseManager={para.schoolNgoCaseManager}
                                    studentClient={para.studentClient}
                                    onChange={this.checkChange}
                                    disable={this.state.disabled}
                                />
                            })}
                        </table>
                        <RolesPagination
                            pageNext={this.pageNext}
                            pagePrevious={this.pagePrevious}
                            disabled={this.diasabled}
                            pageNumber={this.state.pageNumber}
                        />
                    </div>
                </div>
                <SweetAlert success title="Role Added" show={this.state.sweetAlertAddShow} onConfirm={this.sweetAlertHide}>
                    Role Successfully Added
                    </SweetAlert>
                <SweetAlert success title="Role Removed" show={this.state.sweetAlertRemoveShow} onConfirm={this.sweetAlertHide}>
                    Role Successfully Removed
                    </SweetAlert>
            </div>
        )
    }
}

export default Roles
