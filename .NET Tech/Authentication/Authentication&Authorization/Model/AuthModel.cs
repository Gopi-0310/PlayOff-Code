using System.ComponentModel.DataAnnotations;

namespace Authentication_Authorization.Model
{
    public class AuthModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string identifier { get; set; }
        [Required]
        public string password { get; set; }
        public string role { get; set; }
        public string additionalFactor { get; set; }
    }
}
