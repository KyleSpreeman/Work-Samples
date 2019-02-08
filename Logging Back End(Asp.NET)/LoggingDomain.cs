using Eleveight.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eleveight.Models.Domain
{
    public class LoggingDomain : LoggingAddRequest
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

    }
}
