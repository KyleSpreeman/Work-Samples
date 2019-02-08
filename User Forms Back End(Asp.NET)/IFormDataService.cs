using Eleveight.Models.Domain;
using Eleveight.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eleveight.Services.Interfaces
{
    public interface IFormDataService
    {
        void Create(FormDataAddRequest model);
        void SaveFormProgress(FormDataAddRequest model);
        List<FormDataViewModel> SelectByUserId(int id, int formId);
        List<FormProgressModel> SelectProgressByUserId(int formId);
        List<FormIdViewModel> OrderByFormId(int id);
        void Delete(int id, int formId);
        void DeleteInProgress(int formId);
    }
}
