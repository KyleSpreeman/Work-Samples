
import React from 'react'
import { DebounceInput } from 'react-debounce-input'

const LogsSearchForm = props => {
    return (
        //  Show Selector 
        <div className="container-fluid">
            < div className="row align-items-center justify-content-start">
                <div className="offset-col-md " style={{ height: "77px" }}>
                    <div className="dataTables_length" id="DataTables_Table_0_length">
                        <label> Show logs
                        <select name="logPages" aria-controls="DataTables_Table_0" className="form-control form-control-md" value={props.selectValue} onChange={props.onPageChange}>
                                <option name="dropdown1" value="10">10</option>
                                <option name="dropdown2" value="25">25</option>
                                <option name="dropdown3" value="50">50</option>
                                <option name="dropdown4" value="100">100</option>
                            </select>
                        </label>
                    </div>
                </div>
                {/* /Show Selector */}
                {/* Level Selector */}
                <div className="offset-col-md" style={{ height: "78px", paddingLeft: "10px" }} >
                    <div className="dataTables_length" id="DataTables_Table_0_length"></div>
                    <label >Level
                        <select className="custom-select form-control form-control-md" name="levelSearch" value={props.selectLevelValue} onChange={props.onChange}>
                            <option>Select...</option>
                            <option name="levelSearch" value="info">Info</option>
                            <option name="levelSearch" value="warn">Warn</option>
                            <option name="levelSearch" value="error">Error</option>
                            <option name="levelSearch" value="fatal">Fatal</option>
                        </select>
                    </label>
                </div>
                {/* /Level Selector */}
                {/* Date Picker */}
                <div className="col-md" style={{ height: "94px" }}>
                    <label>Date Range</label>
                    <div className="input-daterange input-group" id="datepicker-range">
                        <input type="date" className="form-control form-control-md" name="startDate" value={props.startDate} onChange={props.onChange} />
                        <div className="input-group-append">
                            <span className="input-group-text">to</span>
                        </div>
                        <input type="date" className="form-control form-control-sm" name="endDate" value={props.endDate} onChange={props.onChange} />
                    </div>
                </div>
                {/* /Date Picker */}
                {/* search Bar */}
                <div className="col-md" style={{ height: "75px" }}>
                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                        <label>Search
                        <DebounceInput minLenght={1} debounceTimeout={300} input type="text" name="searchTerm" className="form-control form-control-md" value={props.searchTerm} placeholder="" aria-controls="DataTables_Table_0" onChange={props.onChange} />
                        </label>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default LogsSearchForm