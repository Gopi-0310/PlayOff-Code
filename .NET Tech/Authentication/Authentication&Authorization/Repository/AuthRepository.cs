using Authentication_Authorization.DbAccess;
using Authentication_Authorization.Model;
using Authentication_Authorization.Repository.IRepository;

namespace Authentication_Authorization.Repository
{
    public class AuthRepository : GenericRepository<AuthModel>,IAuthRepository
    {
        private readonly ApplicationDbContext _Dbcontext;
        public AuthRepository(ApplicationDbContext db): base (db)
        {
            _Dbcontext = db;
        }
        public async Task Update(AuthModel entity)
        {
            _Dbcontext.Authentication.Update(entity);
            _Dbcontext.SaveChanges();
        }
    }
}
