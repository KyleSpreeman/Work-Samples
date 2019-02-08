import React from 'react'

const LogsGetAllForm = props => {
    return (
        <tbody>
            <tr className="odd gradeX" key={props.id}>
                <td className="center"><span>{props.id}</span></td>
                <td className="center"><span>{props.createdDate}</span></td>
                <td className="center"><span>{props.thread}</span></td>
                <td className="center"><button className="btn btn-outline-dark" data-toggle="tooltip" data-placement="right" title={props.exception}>{props.level}</button></td>
                <td className="center"><span>{props.logger}</span></td>
                <td className="center"><span>{props.message}</span></td>
                <td>
                    <button className="fas fa-trash-alt" onClick={() => props.delete(props.id)}></button>
                </td>
            </tr>
        </tbody>
    )
}
export default LogsGetAllForm