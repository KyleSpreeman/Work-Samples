using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using System.Collections.Generic;

namespace Eleveight.Services.roles
{
    public interface IRolesService
    {
        int AddRole(RolesAddRequest _addRolesRequest);
        void Delete(int id);
        List<RolesDomain> SelectAll();
        RolesDomain SelectRole(RolesDomain _rolesDomain);
        void Update(RolesUpdateRequest model);
    }
}