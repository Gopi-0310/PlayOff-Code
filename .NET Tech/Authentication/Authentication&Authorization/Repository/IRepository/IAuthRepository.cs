using Authentication_Authorization.Model;

namespace Authentication_Authorization.Repository.IRepository
{
    public interface IAuthRepository : IGenericRepository<AuthModel>
    {
      
        Task Update(AuthModel enity);
    }
}
