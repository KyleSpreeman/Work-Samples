using Data;
using Data.Providers;
using Models.Domain;
using Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.roles
{
    public class RolesService : IRolesService
    {
        private IDataProvider _dataProvider;
        public int AddRole(RolesAddRequest _addRolesRequest)
        {
            int roleId = 0;

            _dataProvider.ExecuteNonQuery(
                "roles_insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    var parm = new SqlParameter();
                    paramCol.AddWithValue("@Id", _addRolesRequest.Id);
                    paramCol.AddWithValue("@RoleName", _addRolesRequest.RoleName);
                },
                returnParameters: delegate (SqlParameterCollection paramCol)
                {
                    roleId = (int)paramCol["@Id"].Value;
                }
            );

            return roleId;
        }

        public RolesDomain SelectRole( RolesDomain _rolesDomain )
        {
            var returnVal = new RolesDomain();
            _dataProvider.ExecuteCmd(
                "roles_select_single",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    if (_rolesDomain.Id > 0 )
                    {
                        paramCol.AddWithValue("@Id", _rolesDomain.Id);
                    } else
                    {
                        paramCol.AddWithValue("@RoleName", _rolesDomain.RoleName);
                    }
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int idx = 0;
                        returnVal.Id = reader.GetSafeInt32(idx++);
                        returnVal.RoleName = reader.GetSafeString(idx++);
                    }
            );

            return returnVal;
        }

        public List<RolesDomain> SelectAll()
        {
            var result = new List<RolesDomain>();
            _dataProvider.ExecuteCmd(
                "roles_select_all",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    var model = new RolesDomain();
                    int idx = 0;
                    model.Id = reader.GetSafeInt32(idx++);
                    model.RoleName = reader.GetSafeString(idx++);
                    result.Add(model);
                }
            );
            return result;
        }


        public void Update(RolesUpdateRequest model)
        {
            this._dataProvider.ExecuteNonQuery(
                "roles_update",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@RoleName", model.RoleName);
                }
            );
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "roles_delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                }
            );
        }

        public RolesService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }
    }
}
