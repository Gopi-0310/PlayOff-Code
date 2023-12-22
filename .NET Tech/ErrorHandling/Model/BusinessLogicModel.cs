using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace ErrorHandling.Model
{
    public class BusinessLogicModel
    {
        [Key]
        public int Id { get; set; }

        [Required (ErrorMessage ="UserName cannot be null or empty Pls Enter UserName")]
        public string? userName { get; set; } 
        [Required (ErrorMessage = "Age cannot be null or empty  Pls Enter Age")]
        public int age { get; set; }
        [Required (ErrorMessage = "DateOfBirth cannot be null or empty Pls Enter DateOfBirth")]
        public DateTime dateOfBirth { get; set; }
        
        public string? email { get; set; }
        public string? userInFormation { get; set; }

       
    }
}
