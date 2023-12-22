using Authentication_Authorization.DbAccess;
using Authentication_Authorization.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Authentication_Authorization.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _Dbcontext;
        public GenericRepository(ApplicationDbContext db)
        {
            _Dbcontext = db;
        }

        public async Task Create(T entity)
        {
           await _Dbcontext.AddAsync(entity);
           await Save();
        }

        public async Task Delete(T entity)
        {
             _Dbcontext.Remove(entity);
            await Save();
        }

        public async Task<List<T>> Get()
        {
            return await _Dbcontext.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _Dbcontext.Set<T>().FindAsync(id);
        }

        public async Task Save()
        {
            await _Dbcontext.SaveChangesAsync();
        }
    }
}
