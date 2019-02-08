using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class UserRolesAddRequest
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
    }
}
