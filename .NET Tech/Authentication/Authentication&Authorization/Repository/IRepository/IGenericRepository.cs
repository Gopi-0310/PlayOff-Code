using Authentication_Authorization.Model;

namespace Authentication_Authorization.Repository.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<List<T>> Get();
        Task Create(T entity);
        Task Delete(T enitity);
        Task Save();
    }
}
