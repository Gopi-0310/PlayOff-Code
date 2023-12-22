
using ErrorHandling.Model;
using ErrorHandling.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Data;

namespace ErrorHandling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessLogicController : ControllerBase
    {

        private readonly BusinessLogicService _businessLogicService;
        private string queryParamData = "";
        private int    defaultId      = 0;
        public BusinessLogicController(BusinessLogicService _service){ _businessLogicService = _service; }


        [HttpPost]
        [Route("createInfo")]
        public Object Create([FromBody] BusinessLogicModel model)
        {
            this.queryParamData  = "CreateUserInfo";
            var data             = _businessLogicService.MyMethod(this.defaultId, model, queryParamData);
            return data;
            
        }

        [HttpGet]
        [Route("getInfo")]
        public Object GetAll()
        {
            this.queryParamData      = "GetUserInfo";
            BusinessLogicModel model = new BusinessLogicModel();
            var data                 = _businessLogicService.MyMethod(this.defaultId, model, queryParamData);
            return data;
        }

        [HttpGet]
        [Route("getInfoWithId")]
        public Object GetById(int id )
        {
            this.queryParamData      = "GetUserInfoWithId";
            BusinessLogicModel model = new BusinessLogicModel();
            var data                 = _businessLogicService.MyMethod(id, model, queryParamData);
            if(data == "Id does not exists")
            {
                return NotFound(data);
            }
            return data;
        }

        [HttpPut]
        [Route("updateInfo")]
        public Object Update([FromBody]BusinessLogicModel model )
        {
            this.queryParamData  = "UpdateUserInfo";
            var data             = _businessLogicService.MyMethod(this.defaultId, model, queryParamData);
            return data;
        }

        [HttpDelete]
        [Route("deleteInfo")]
        public Object DeleteById(int id)
        {
            this.queryParamData      = "DeleteUserInfo";
            BusinessLogicModel model = new BusinessLogicModel();
            var data                 = _businessLogicService.MyMethod(id, model, queryParamData);

            return data;
        }
    }
}
