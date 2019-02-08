
import React from 'react'
import { DebounceInput } from 'react-debounce-input'

const RolesSearchForm = props => {
    return (
        //  Show Selector 
        <div className="container-fluid">
            < div className="row" >
                <div className="col-md-2">
                    <div className="dataTables_length" id="DataTables_Table_0_length">
                        <label> Show Users:
                        <select name="pageSize" aria-controls="DataTables_Table_0" className="form-control form-control-md" value={props.selectValue} onChange={props.onChange}>
                                <option name="dropdown1" value="10">10</option>
                                <option name="dropdown2" value="25">25</option>
                                <option name="dropdown3" value="50">50</option>
                                <option name="dropdown4" value="100">100</option>
                            </select>
                        </label>
                    </div>
                </div>
                {/* /Show Selector */}
                {/* search Bar */}
                <div className="col-md-4">
                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                        <label>Search:
                        <DebounceInput minLenght={2} debounceTimeout={300} type="text" name="searchTerm" className="form-control form-control-md" value={props.searchTerm} aria-controls="DataTables_Table_0" onChange={props.onChange} />
                        </label>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default RolesSearchForm