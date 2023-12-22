using Authentication_Authorization.DbAccess;
using Authentication_Authorization.Model;
using Authentication_Authorization.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace Authentication_Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
     
        public AuthController(IAuthRepository repository, ApplicationDbContext db)
        {
            _authRepository = repository;
          
        }



   

        [HttpGet]
        [Route("GetInfo")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<AuthModel>>> GetAll()
        {
            var result = await _authRepository.Get();
            if(result == null)
            {
                return NoContent();
            }
            Console.WriteLine("hello");

            
            return Ok(result);
        }


        [HttpPost]
        [Route("CreateInfo")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<AuthModel>> Create( [FromBody] AuthModel model)
        {
           await _authRepository.Create(model);

            return Ok(model);
        }


        [HttpGet]
        [Route("GetbyIdInfo")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<AuthModel>> GetById(int id)
        {
            var res = await _authRepository.GetById(id);
            if(res == null)
            {
                return NoContent();
            }
            return Ok(res);
        }

        [HttpPut]
        [Route("UpdateInfo")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthModel>> Update(int id,AuthModel model)
        {
            if(model == null || id != model.Id)
            {
                return BadRequest();
            }
            await _authRepository.Update(model);
            return Ok(model);
        }

        [HttpDelete]
        [Route("DeleteInfo")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteById(int id)
        {
            var res = await _authRepository.GetById(id);
            if(res == null)
            {
                return NotFound();
            }
            await _authRepository.Delete(res);
            return Ok();
        }
    }
}
