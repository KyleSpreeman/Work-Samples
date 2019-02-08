using Models.Domain;
using Models.Requests;
using Models.Responses;
using Models.ViewModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/logging")]
    public class LoggingController : ApiController
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        ILoggingService _loggingService;

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(LoggingDomain model)
        {
            try
            {
                // if (ModelState.IsValid) {
                var resp = new ItemResponse<int>();
                resp.Item = _loggingService.Create(model);
                log.Info("Create successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Create failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [HttpPost]
        [Route("search")]
        public HttpResponseMessage search(LogSearchDomain model)
        {
            try
            {
                var resp = new ItemsResponse<LoggingDomain>();
                resp.Items = _loggingService.Search(model);
                log.Info("Logs search successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);     
            }
            catch (Exception ex)
            {
                log.Warn("Log search failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }


        [HttpGet]
        [Route]
        public HttpResponseMessage SelectAll()
        {
            try
            {
                var resp = new ItemsResponse<LoggingDomain>();
                resp.Items = _loggingService.SelectAll();
                log.Info("Get all successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Select all failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public HttpResponseMessage SelectById(int id)
        {
            try
            {
                var resp = new ItemResponse<LoggingDomain>();
                log.Info("Select by Id successful");
                resp.Item = _loggingService.SelectById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Select all failed", ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{PageNumber:int}/{PageSize:int}")]
        public HttpResponseMessage SelectByPageNumber(int PageNumber, int PageSize)
        {
            // key + pair pageNumber={pageNumber} 
            try
            {
                var resp = new ItemsResponse<LoggingDomain>();
                log.Info("Pagination successful");
                resp.Items = _loggingService.SelectByPageNumber(PageNumber, PageSize);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Pagination failed", ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(LoggingDomain model)
        {
            try
            {

                _loggingService.Update(model);
                var resp = new SuccessResponse();
                log.Info("Update successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Update failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var svc = new ItemResponse<LoggingDomain>();
                _loggingService.Delete(id);
                var resp = new SuccessResponse();
                log.Info("Delete Successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Delete failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                throw;
            }
        }

        public LoggingController(ILoggingService loggingService)
        {
            _loggingService = loggingService;
        }
    }
}
