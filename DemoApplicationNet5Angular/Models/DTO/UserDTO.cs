using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApplicationNet5Angular.Models.DTO
{

    public class UserDTO
    {
        public UserDTO(string fullName, string userName, string email, DateTime createdDate)
        {
            Fullname = fullName;
            Username = userName;
            Email = email;
            CreatedDate = createdDate;
        }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
