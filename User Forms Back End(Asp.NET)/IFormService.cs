using Models.Domain;
using Models.Requests;
using System.Collections.Generic;

namespace Services
{
    public interface IFormService
    {
       int Create(FormAddRequest model);
       FormDomainModel SelectById(int id);
       List<FormDomainModel> SelectAllByUserId();
       int Update(FormDomainModel model);
       void DeleteUserForm(int formId);
    }
}
