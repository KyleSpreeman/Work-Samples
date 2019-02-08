using Models.Domain;
using Models.Requests;
using Models.Responses;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/formdata")]
    public class FormDataApiController : ApiController
    {
        private IFormDataService _formDataService;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public FormDataApiController(IFormDataService formDataService)
        {
            _formDataService = formDataService;
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Create(FormDataAddRequest model)
        {
            try
            {
                _formDataService.Create(model);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Create Form Data");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error: Create Form Data Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage SaveFormProgress(FormDataAddRequest model)
        {
            try
            {
                _formDataService.SaveFormProgress(model);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Save Form progress Data");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error: Create Form Data Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("progress/{formId:int}")]
        public HttpResponseMessage SelectProgressByUserId(int formId)
        {
            try
            {
                ItemsResponse<FormProgressModel> resp = new ItemsResponse<FormProgressModel>();
                resp.Items = _formDataService.SelectProgressByUserId(formId);
                log.Info("Select Progress By User Id Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Select Progress by User Id Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{id:int}/{formId:int}")]
        public HttpResponseMessage SelectByUserId(int id, int formId)
        {
            try
            {
                ItemsResponse<FormDataViewModel> resp = new ItemsResponse<FormDataViewModel>();
                resp.Items = _formDataService.SelectByUserId(id, formId);
                log.Info("Select By User Id Successful");
                var grouped = resp.Items.GroupBy(item => item.Position)
                    .Select(group => new { Position = group.Key, Items = group.ToList() }).ToList()
                    .OrderBy(group => group.Items.First().Position);
                return Request.CreateResponse(HttpStatusCode.OK, grouped);
            }
            catch (Exception ex)
            {
                log.Warn("Select By User Id Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("order/{id:int}")]
        public HttpResponseMessage OrderByFormId(int id)
        {
            try
            {
                ItemsResponse<FormIdViewModel> resp = new ItemsResponse<FormIdViewModel>();
                resp.Items = _formDataService.OrderByFormId(id);
                log.Info("Order By Form Id Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Order By Form Id Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}/{formId:int}")]
        public HttpResponseMessage Delete(int id, int formId)
        {
            try
            {
                _formDataService.Delete(id, formId);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Delete Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Delete Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("{formId:int}")]
        public HttpResponseMessage DeleteInProgress(int formId)
        {
            try
            {
                _formDataService.DeleteInProgress(formId);
                SuccessResponse resp = new SuccessResponse();
                log.Info("Delete Progress Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Delete Progress Failed");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
