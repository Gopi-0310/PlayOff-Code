using Authentication_Authorization.Model;
using Microsoft.EntityFrameworkCore;

namespace Authentication_Authorization.DbAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<AuthModel> Authentication { get; set; }
    }
}
