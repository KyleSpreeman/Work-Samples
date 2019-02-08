import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LogsCreateForm from './LogsCreateForm'
import FormErrors from './common/FormErrors'
import LogService from '../services/LogService'
import LogsGetAllForm from './LogsGetAllForm'
import LogsSearchForm from './LogsSearchForm'
import LogsPagination from './LogsPagination'
import LogServices from '../services/LogService'
import moment from 'moment'


class Logs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createdDate: "",
            id: "",
            thread: "",
            levelSearch: "",
            logger: "",
            message: "",
            exception: "",
            pagedItems: [],
            logsDisplayed: "",
            searchTerm: "",
            startDate: "1 / 2 / 1753",
            endDate: "12 / 29 / 9999",
            pageNumber: 0,
            pageSize: 10,
            sortBy: "",
            sortOrder: "DESC",
            searchObject: {
                searchTerm: "",
                levelSearch: "",
                startDate: 1 / 1 / 1753,
                endDate: 12 / 31 / 9999,
            }
        }
    }

    componentDidMount() {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => LogService.selectByPageNumber(this.state.pageNumber, this.state.pageSize, this.onGetSuccess, this.onGetError))
        console.log(this.state)
    }


    onGetSuccess = response => {
        console.log(response)
        let items = response.data.items
        this.setState({
            pagedItems: items
        })
    }

    onChange = evt => {
        let key = evt.target.name
        let val = evt.target.value
        let searchObject = {
            ...this.state.searchObject
        }
        searchObject.searchTerm = this.state.searchObject.searchTerm
        searchObject.startDate = this.state.searchObject.startDate
        searchObject.endDate = this.state.searchObject.endDate
        searchObject.levelSearch = this.state.searchObject.levelSearch
        searchObject.pageNumber = this.state.pageNumber
        searchObject.pageSize = this.state.pageSize
        searchObject.pageSize = this.state.sortBy
        searchObject.pageSize = this.state.sortOrder
        if (this.state.sortOrder == 'DESC') {
            this.setState({
                searchObject,
                [key]: val,
                pageNumber: 1,
                sortOrder: 'ASC'
            }, () => this.filterLogs(searchObject))
        } else {
            this.setState({
                searchObject,
                [key]: val,
                pageNumber: 1,
                sortOrder: 'DESC'
            }, () => this.filterLogs(searchObject))
        }
    }

    filterLogs = items => {
        console.log(this.state)
        let data = {
            searchTerm: this.state.searchTerm,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            levelSearch: this.state.levelSearch,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize,
            sortBy: this.state.sortBy,
            sortOrder: this.state.sortOrder
        }
        if (this.state.levelSearch == this.state.levelSearch) {
            LogServices.search(data, this.onGetSuccess, this.onGetError)
        } else {
            this.setState({
                pageNumber: 1
            }, LogServices.search(data, this.onGetSuccess, this.onGetError))
        }
    }

    onFilterSuccess = resp => {
        let items = resp.data.items
        this.setState({
            pagedItems: items
        })
    }


    submit = evt => {
        if (this.state.id !== "") {
            let data = {
                id: this.state.id,
                level: this.state.level,
                thread: this.state.thread,
                logger: this.state.logger,
                message: this.state.message,
                exception: this.state.exception
            }
            LogService.update(data, this.onUpdateSuccess, this.onUpdateError)
        } else {
            const data = {
                level: this.state.level,
                thread: this.state.thread,
                logger: this.state.logger,
                message: this.state.message,
                exception: this.state.exception
            }
            LogService.create(data, this.onCreateSuccess, this.onCreateError)
        }
    }

    onCreateSuccess = resp => {
    }

    onCreateError = err => {
    }

    onUpdateSuccess = response => {
        window.location.reload()
    }

    onUpdateError = err => {
    }

    search = id => {
        const data = Number.parseInt(id)
        LogService.selectById(data, this.onSearchSuccess, this.onSearchError)
    }

    onSearchSuccess = response => {

        let item = response.data.item
        console.log(item)
        this.setState({
            id: item.id,
            level: item.level,
            thread: item.thread,
            logger: item.logger,
            message: item.message,
            exception: item.exception
        })
    }

    delete = id => {
        LogService.delete(id, this.onDeleteSuccess, this.onDeleteError)
    }

    onDeleteSuccess = response => {
        window.location.reload()
    }

    onDeleteError = err => {
    }

    handlePageChange = evt => {
        if (this.state.searchTerm !== "" || this.state.levelSearch !== "") {
            this.setState({
                pageSize: evt.target.value
            }, () => this.filterLogs())
        } else {
            this.setState({
                pageSize: evt.target.value
            }, () => LogService.selectByPageNumber(this.state.pageNumber, this.state.pageSize, this.onPaginationSuccess, this.onPaginationError))
        }
    }

    onPaginationSuccess = response => {
        this.setState({
            pagedItems: response.data.items
        })

    }

    onPaginationError = err => {
        console.log(err)
    }

    logsSearch = evt => {
    }

    handleDate = evt => {
        console.log(this.state.startDate, this.state.endDate)
    }

    pageNext = evt => {
        if (this.state.pagedItems.length == 0) {
            this.setState({
                disable: true
            })
        } else {
            if (this.state.searchTerm !== "" || this.state.levelSearch !== "") {
                this.setState({
                    pageNumber: this.state.pageNumber + 1
                }, () => this.filterLogs())
            } else {
                this.setState({
                    pageNumber: this.state.pageNumber + 1
                }, () => LogService.selectByPageNumber(this.state.pageNumber, this.state.pageSize, this.onPaginationSuccess, this.onPaginationError))
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
                }, () => this.filterLogs())
            } else {
                this.setState({
                    disable: false,
                    pageNumber: this.state.pageNumber - 1
                }, () => LogService.selectByPageNumber(this.state.pageNumber, this.state.pageSize, this.onPaginationSuccess, this.onPaginationError))
            }
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid flex-grow-1 container-p-y">
                    <h4 className="font-weight-bold py-3 mb-4" >
                        <span className="text-muted font-weight-light">Logs</span>
                    </h4>
                    <LogsSearchForm
                        selectValue={this.state.pageSize}
                        selectLevelValue={this.state.levelSearch}
                        onPageChange={this.handlePageChange}
                        onChange={this.onChange}
                        searchTerm={this.state.searchTerm}
                        submitSearch={this.logsSearch}
                        submitDate={this.handleDate}
                    />
                    <div className="table-responsive">
                        <table className="datatables-demo table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id <button className="fas fa-sort float-right" name="sortBy" value="Id" onClick={this.onChange}></button></th>
                                    <th>Created date <button className="fas fa-sort float-right" name="sortBy" value="createdDate" onClick={this.onChange}></button></th>
                                    <th>Thread</th>
                                    <th>Level <button className="fas fa-sort float-right" name="sortBy" value="level" onClick={this.onChange}></button></th>
                                    <th>Logger <button className="fas fa-sort float-right" name="sortBy" value="logger" onClick={this.onChange}></button></th>
                                    <th>Message <button className="fas fa-sort float-right" name="sortBy" value="message" onClick={this.onChange}></button></th>
                                </tr>
                            </thead>
                            {this.state.pagedItems.map((para) => {
                                return <LogsGetAllForm
                                    key={para.id}
                                    id={para.id}
                                    level={para.level}
                                    thread={para.thread}
                                    logger={para.logger}
                                    message={para.message}
                                    createdDate={moment(para.createdDate).format('MMMM Do YYYY, h:mm:ss a')}
                                    exception={para.exception}
                                    handleSearch={this.search}
                                    delete={this.delete} />
                            })}
                        </table>
                        <LogsPagination
                            pageNext={this.pageNext}
                            pagePrevious={this.pagePrevious}
                            pageNumber={this.state.pageNumber}
                        />
                    </div>
                </div>
            </div >
        )
    }
}

export default Logs