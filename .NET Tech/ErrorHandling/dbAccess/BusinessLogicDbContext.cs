using ErrorHandling.Model;
using Microsoft.EntityFrameworkCore;

namespace ErrorHandling.dbAccess
{
    public class BusinessLogicDbContext: DbContext
    {
        public BusinessLogicDbContext(DbContextOptions<BusinessLogicDbContext> options) : base(options) { }
        
        public DbSet<BusinessLogicModel> ErrorHadlingTable { get; set; }  
    }
}
