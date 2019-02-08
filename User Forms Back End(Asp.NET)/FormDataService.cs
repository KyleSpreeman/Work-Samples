using Eleveight.Data;
using Eleveight.Data.Providers;
using Eleveight.Models;
using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using Eleveight.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eleveight.Services.Form
{
    public class FormDataService : IFormDataService
    {
        private IDataProvider _dataProvider;
        private IAuthenticationService _authService;

        public FormDataService(IDataProvider dataProvider, IAuthenticationService authService)
        {
            _dataProvider = dataProvider;
            _authService = authService;
        }

        public void Create(FormDataAddRequest model)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            this._dataProvider.ExecuteNonQuery(
                "InputControlFormData_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@InputControlId", model.InputControlId);
                    paramList.AddWithValue("@UserId", model.UserId);
                    paramList.AddWithValue("@Value", model.Value);
                });
        }

        public void SaveFormProgress(FormDataAddRequest model)
        {
            IUserAuthData currentUser;
            currentUser = _authService.GetCurrentUser();
            _dataProvider.ExecuteNonQuery(
                "user_form_in_progress_upsert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@InputControlId", model.InputControlId);
                    paramList.AddWithValue("@UserId", currentUser.Id);
                    paramList.AddWithValue("@Value", model.Value);
                    paramList.AddWithValue("@FormId", model.FormId);

                });
        }


        public List<FormProgressModel> SelectProgressByUserId(int formId)
        {
            IUserAuthData currentUser;
            currentUser = _authService.GetCurrentUser();
            List<FormProgressModel> result = new List<FormProgressModel>();
            _dataProvider.ExecuteCmd(
                "user_form_in_progress_select_all_by_id",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@UserId", currentUser.Id);
                    paramCol.AddWithValue("@FormId", formId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    FormProgressModel model = new FormProgressModel();
                    int idx = 0;
                    model.InputControlId = reader.GetSafeInt32(idx++);
                    model.Value = reader.GetSafeString(idx++);
                    model.FormId = reader.GetSafeInt32(idx++);
                    idx++;
                    result.Add(model);
                });
            return result;
        }

        public List<FormDataViewModel> SelectByUserId(int id, int formId)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            List<FormDataViewModel> result = new List<FormDataViewModel>();
            _dataProvider.ExecuteCmd(
                "InputControlFormData_View",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", id);
                    paramList.AddWithValue("@FormId", formId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    FormDataViewModel model = null;
                    int index = 0;
                    model = MapFormData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }

        public static FormDataViewModel MapFormData(IDataReader reader, int index)
        {
            FormDataViewModel model = new FormDataViewModel();
            model.Title = reader.GetSafeString(index++);
            model.Version = reader.GetSafeDecimal(index++);
            model.FormId = reader.GetSafeInt32(index++);
            model.Label = reader.GetSafeString(index++);
            model.Name = reader.GetSafeString(index++);
            model.Type = reader.GetSafeString(index++);
            model.Position = reader.GetSafeInt32(index++);
            model.ParentId = reader.GetSafeInt32(index++);
            model.Value = reader.GetSafeString(index++);
            model.Id = reader.GetSafeInt32(index++);
            model.InputControlId = reader.GetSafeInt32(index++);
            return model;
        }

        public List<FormIdViewModel> OrderByFormId(int id)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            List<FormIdViewModel> list = new List<FormIdViewModel>();
            _dataProvider.ExecuteCmd(
                "InputControlFormData_OrderByFormId",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", id);
                },
                singleRecordMapper : delegate (IDataReader reader, short set)
                {
                    FormIdViewModel model = null;
                    int index = 0;
                    model = MapFormId(reader, index);
                    index++;
                    list.Add(model);
                });
            return list;
        }

        public static FormIdViewModel MapFormId(IDataReader reader, int index)
        {
            FormIdViewModel model = new FormIdViewModel();
            model.FormId = reader.GetSafeInt32(index++);
            return model;
        }

        public void Delete(int id, int formId)
        {
            _dataProvider.ConnectionString = ConfigurationManager.ConnectionStrings["C61Connection"].ConnectionString;
            _dataProvider.ExecuteNonQuery(
                "InputControlFormData_Delete",
                inputParamMapper : delegate(SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", id);
                    paramList.AddWithValue("@FormId", formId);
                });
        }

        public void DeleteInProgress(int formId)
        {
            IUserAuthData currentUser;
            currentUser = _authService.GetCurrentUser();
            _dataProvider.ExecuteNonQuery(
                "user_form_in_progress_delete",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", currentUser.Id);
                    paramList.AddWithValue("@FormId", formId);
                });
        }
    }
}
