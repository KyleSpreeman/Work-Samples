using System;
using System.Collections.Generic;
using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using Eleveight.Models.ViewModels;

namespace Eleveight.Services.Interfaces
{
    public interface ILoggingService
    {
        int Create(LoggingDomain LoggingDomain);
        List<LoggingDomain> Search(LogSearchDomain LogSearchDomain);
        void Delete(int id);
        List<LoggingDomain> SelectAll();
        LoggingDomain SelectById(int id);
        List<LoggingDomain> SelectByPageNumber(int PageNumber, int PageSize);
        void Update(LoggingDomain model);
    }
}