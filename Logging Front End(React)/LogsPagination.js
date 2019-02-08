import React from 'react'

const LogsPagination = props => {
    return (
        <div style={{ height: "100px" }}>
            <nav>
                <button type="button" className="btn btn-outline-primary" onClick={props.pagePrevious} >«</button>
                <span> Page: {props.pageNumber}  </span>
                <button type="button" className="btn btn-outline-primary" onClick={props.pageNext} >»</button>
            </nav>
        </div>
    )
}
export default LogsPagination