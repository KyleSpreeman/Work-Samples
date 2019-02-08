using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using Eleveight.Models.Responses;
using Eleveight.Services;
using Eleveight.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Eleveight.Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/form")]
    public class FormApiController : ApiController
    {
        private IFormService _formService;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public FormApiController(IFormService formService)
        {
            _formService = formService;
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Create(FormAddRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int id = _formService.Create(model);
                    ItemResponse<int> resp = new ItemResponse<int>();
                    resp.Item = id;
                    log.Info("Create Form");
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    log.Error("Error: Model State Invalid");
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error: Create Form Failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        
        [HttpGet]
        [Route("{id:int}")]
        public HttpResponseMessage SelectById(int id)
        {
            try
            {
                ItemResponse<FormDomainModel> resp = new ItemResponse<FormDomainModel>();
                resp.Item = _formService.SelectById(id);
                log.Info("Select Form by Id Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error: Selecy Form by Id Failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("user")]
        public HttpResponseMessage SelectAllByUserId()
        {
            try
            {
                ItemsResponse<FormDomainModel> resp = new ItemsResponse<FormDomainModel>();
                resp.Items = _formService.SelectAllByUserId();
                log.Info("Select all by User Id Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error: Select all by User Id Failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(FormDomainModel model)
        {
            try
            {
                _formService.Update(model);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Update Form by Id");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error: Update Form Failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("delete/{formId:int}")]
        public HttpResponseMessage DeleteForm(int formId)
        {
            try
            {
                _formService.DeleteUserForm(formId);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Delete User form successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Delete user form failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}