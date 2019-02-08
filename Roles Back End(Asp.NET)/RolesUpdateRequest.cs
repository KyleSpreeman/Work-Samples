using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests
{
    public class RolesUpdateRequest : RolesAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
