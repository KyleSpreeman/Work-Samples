
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eleveight.Models.Domain
{
    public class UserRolePivotDomain
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int SuperAdmin { get; set; }
        public int Implementer { get; set; }
        public int FundingSourceAdmin { get; set; }
        public int SchoolNgoAdmin { get; set; }
        public int FundingSourceDirector { get; set; }
        public int SchoolNgoDirector { get; set; }
        public int FundingSourceCaseManager { get; set; }
        public int SchoolNgoCaseManager { get; set; }
        public int StudentClient { get; set; }
    }
}