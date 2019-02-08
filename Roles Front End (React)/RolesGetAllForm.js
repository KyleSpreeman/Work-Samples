import React from 'react'

const RolesGetAllForm = props => {
    return (
        <tbody>
            <tr className="odd gradeX" key={props.userId} >
                <td className="center"><span>{props.firstName}</span></td>
                <td className="center"><span>{props.lastName}</span></td>
                <td className="center"><span>{props.email}</span></td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="superAdmin" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.superAdmin} value={props.superAdmin} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="implementer" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.implementer} value={props.implementer} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="fundingSourceAdmin" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.fundingSourceAdmin} value={props.fundingSourceAdmin} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="schoolNgoAdmin" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.schoolNgoAdmin} value={props.schoolNgoAdmin} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="fundingSourceDirector" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.fundingSourceDirector} value={props.fundingSourceDirector} />
                        <span className="form-check-label"> </span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="schoolNgoDirector" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.schoolNgoDirector} value={props.schoolNgoDirector} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="fundingSourceCaseManager" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.fundingSourceCaseManager} value={props.fundingSourceCaseManager} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="schoolNgoCaseManager" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.schoolNgoCaseManager} value={props.schoolNgoCaseManager} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
                <td className="center">
                    <label className="form-check form-check-inline">
                        <input className="form-check-input" id={props.userId} name="studentClient" type="checkbox" disabled={props.disabled} onChange={props.onChange} checked={props.studentClient} value={props.studentClient} />
                        <span className="form-check-label"></span>
                    </label>
                </td>
            </tr>
        </tbody>
    )
}
export default RolesGetAllForm