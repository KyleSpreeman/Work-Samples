using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

using Eleveight.Data;
using Eleveight.Data.Providers;
using Eleveight.Models.Requests;
using Eleveight.Services.Interfaces;
using Eleveight.Models.Domain;
using System.Configuration;
using Eleveight.Models;

namespace Eleveight.Services
{
    public class FormService : IFormService
    {
        private IDataProvider _dataProvider;
        private IAuthenticationService _authService;

        public FormService (IDataProvider dataProvider, IAuthenticationService authService)
        {
            _dataProvider = dataProvider;
            _authService = authService;
        }

        public int Create(FormAddRequest model)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            int id = 0;
            this._dataProvider.ExecuteNonQuery(
                "Form_Insert",
               inputParamMapper: delegate (SqlParameterCollection paramList)
               {
                   SqlParameter param = new SqlParameter();
                   param.ParameterName = "@Id";
                   param.SqlDbType = SqlDbType.Int;
                   param.Direction = ParameterDirection.Output;
                   paramList.Add(param);

                   paramList.AddWithValue("@Title", model.Title);
                   paramList.AddWithValue("@Description", model.Description);
                   paramList.AddWithValue("@Version", model.Version);
                   paramList.AddWithValue("@ModifiedBy", model.ModifiedBy);
               },
               returnParameters: delegate (SqlParameterCollection paramList)
               {
                   id = (int)paramList["@Id"].Value;
               });
            return id;
        }

        public FormDomainModel SelectById(int id)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            FormDomainModel model = null;
            this._dataProvider.ExecuteCmd(
            "Form_SelectById",
            inputParamMapper: delegate (SqlParameterCollection paramList)
            {
                paramList.AddWithValue("@Id", id);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                model = MapForm(reader, index);
            });
            return model;
        }

        public static FormDomainModel MapForm(IDataReader reader, int index)
        {
            FormDomainModel model = new FormDomainModel();
            model.Id = reader.GetSafeInt32(index++);
            model.Title = reader.GetSafeString(index++);
            model.Description = reader.GetSafeString(index++);
            model.Version = reader.GetSafeDecimal(index++);
            model.CreatedDate = reader.GetSafeDateTime(index++);
            model.ModifiedDate = reader.GetSafeDateTime(index++);
            model.ModifiedBy = reader.GetSafeString(index++);
            return model;
        }

        public int Update(FormDomainModel model)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            int id = 0;
            this._dataProvider.ExecuteNonQuery(
                "Form_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
               {
                   paramList.AddWithValue("@Id", model.Id);
                   paramList.AddWithValue("@Title", model.Title);
                   paramList.AddWithValue("@Description", model.Description);
                   paramList.AddWithValue("@Version", model.Version);
                   paramList.AddWithValue("@ModifiedBy", model.ModifiedBy);
               },
                returnParameters: delegate (SqlParameterCollection paramList)
               {
                   id = (int)paramList["@Id"].Value;
               });
            return id;
        }

        public List<FormDomainModel> SelectAllByUserId()
        {
            IUserAuthData currentUser;
            currentUser = _authService.GetCurrentUser();
            List<FormsPerUserDomain> result = new List<FormsPerUserDomain>();
            List<FormDomainModel> newModel = new List<FormDomainModel>();
            _dataProvider.ExecuteCmd(
                "user_form_select_all_by_id",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@userId", currentUser.Id);
                },
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   FormsPerUserDomain model = new FormsPerUserDomain();
                   int idx = 0;
                   model.formId = reader.GetSafeInt32(idx++);
                   result.Add(model);
               });
            foreach(FormsPerUserDomain formId in result)
            {
                var form = SelectById(formId.formId);
                newModel.Add(form);
            }
           return newModel;
        }

        public static OrgFormViewModel MapOrgForm(IDataReader reader, int index)
        {
            OrgFormViewModel model = new OrgFormViewModel();
            model.Title = reader.GetSafeString(index++);
            model.Description = reader.GetSafeString(index++);
            model.Version = reader.GetSafeDecimal(index++);
            model.FormId = reader.GetSafeInt32(index++);
            model.OrgId = reader.GetSafeInt32(index++);
            
            return model;
        }

        public void DeleteUserForm(int formId)
        {
            IUserAuthData currentUser;
            currentUser = _authService.GetCurrentUser();
            _dataProvider.ExecuteNonQuery(
                "user_form_delete",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@userId", currentUser.Id);
                    paramList.AddWithValue("@formId", formId);
                });
        }


    }
}
