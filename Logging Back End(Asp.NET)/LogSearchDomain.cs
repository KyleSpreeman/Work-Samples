using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eleveight.Models.Domain
{
    public class LogSearchDomain
    {
        public string searchTerm { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string levelSearch { get; set; }
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public string sortBy { get; set; }
        public string sortOrder { get; set; }
    }
}
