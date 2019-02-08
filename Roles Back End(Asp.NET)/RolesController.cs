using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using Eleveight.Models.Responses;
using Eleveight.Services;
using Eleveight.Services.roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Eleveight.Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/roles")]
    public class RolesController : ApiController
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private IRolesService _rolesService;

        [HttpPost]
        [Route("")]
        public HttpResponseMessage AddRole(RolesAddRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var resp = new ItemResponse<int>();
                    resp.Item = _rolesService.AddRole(model);
                    log.Info("Role added successful");
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Warn("Role add failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("select_role")]
        public HttpResponseMessage SelectRole(RolesDomain model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var resp = new ItemResponse<RolesDomain>();
                    resp.Item = _rolesService.SelectRole(model);
                    log.Info("Select Role successful");
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Warn("Select Role failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage SelectAll()
        {
            try
            {
                var resp = new ItemsResponse<RolesDomain>();
                resp.Items = _rolesService.SelectAll();
                log.Info("Select all successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Select all failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(RolesUpdateRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _rolesService.Update(model);
                    var resp = new SuccessResponse();
                    log.Info("Update user role successful");
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Warn("Update user role failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var resp = new ItemResponse<RolesDomain>();
                _rolesService.Delete(id);
                log.Info("Delete role successful");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Warn("Delete role failed", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public RolesController(IRolesService RolesService)
        {
            _rolesService = RolesService;
        }
    }
}
