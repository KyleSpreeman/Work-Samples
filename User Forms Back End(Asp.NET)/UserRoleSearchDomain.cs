using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class UserRoleSearchDomain
    {
        public int UserId { get; set; }
        public string SearchTerm { get; set; }
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        
    }
}
