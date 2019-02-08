import React from 'react'

const RolesPagination = props => {
    return (
        <div style={{ height: "100px" }}>
            <nav>
                <button type="button" className="btn btn-outline-primary" onClick={props.pagePrevious} disabled={props.disabled}>«</button>
                <span> Page: {props.pageNumber}  </span>
                <button type="button" className="btn btn-outline-primary" onClick={props.pageNext} disabled={props.disabled}>»</button>
            </nav>
        </div>
    )
}
export default RolesPagination