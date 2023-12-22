using ErrorHandling.dbAccess;
using ErrorHandling.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Reflection.Metadata.Ecma335;

namespace ErrorHandling.services
{
    public class BusinessLogicService
    {
        private readonly BusinessLogicDbContext _dbContext;

        
        public BusinessLogicService(BusinessLogicDbContext db) { _dbContext = db; }
       

        public Object MyMethod(int id, BusinessLogicModel model,string queryName)
        {
            try
            {
                if(queryName == "CreateUserInfo")
                {
                    _dbContext.Add(model);
                    _dbContext.SaveChanges();
                    if(model != null)
                    {
                        return model;
                    }
                    return "Something went wroung while user Create Info";
                }

                else if(queryName == "GetUserInfoWithId")
                {
                    BusinessLogicModel _model = _dbContext.ErrorHadlingTable.FirstOrDefault(X => X.Id == id);
                    if(_model == null)
                    {
                        return "Id does not exists";
                    }
                    return _model;
                }

                else if(queryName == "GetUserInfo") 
                 {
                    List<BusinessLogicModel> _businessModel = new List<BusinessLogicModel>();
                    _businessModel = _dbContext.ErrorHadlingTable.ToList();
                    return _businessModel;

                }

                else if (queryName == "UpdateUserInfo")
                { 
                      _dbContext.Update(model);
                      _dbContext.SaveChanges();
                    return model;


                }

                else if (queryName == "DeleteUserInfo")
                {
                    var _model = _dbContext.ErrorHadlingTable.FirstOrDefault(model => model.Id == id);
                    _dbContext.Remove(_model);
                    _dbContext.SaveChanges();
                    if (_model == null)
                    {
                        return "Id does not exists";
                    }
                    return _model;
                  

                }
            }
            catch(ArgumentException ex) //A non-null argument that is passed to a method is invalid
            {
                return ("ArgumentException Error Message==> Its a Database error. pls check your Request " + (ex.Message));
            }
            catch (DbUpdateConcurrencyException ex) //A method call u can enter without id in database
            {
                return ("DbUpdateConcurrencyException Error Message==> Its a Database error.pls give Exsits id here " + ex.Message);
            }
            catch (DbUpdateException ex) //A method call u can enter unorder id or unorder data into database
            {
                return ("DbUpdateException Error Message==> Its a Database error.pls give a proper payLoad " + ex.Message); 
            }
            catch (InvalidOperationException ex) //A method call is invalid in an object's current state.
            {
                return ("InvalidOperationException Error Message==> The exception that is thrown when a method call is invalid for the object's current state. pls check your code " + ex.Message); 
            }
            catch (IndexOutOfRangeException ex) //An index is outside the bounds of an array or collection.
            {
                return ("IndexOutOfRangeException Error Message==> Index was outside the bounds of the array." + ex.Message);
            }
            catch (FormatException ex) //A value is not in an appropriate format to be converted from a string by a conversion method such as Parse.
            {
                return (  "FormatException Error Message==>  pls check your value formate" + ex.Message);
            }
            catch (InvalidCastException ex) //server error
            {
                return ("InvalidCastException Error Message==> Unable to cast object of type" + ex.Message);
            }

            catch (KeyNotFoundException ex) //The specified key for accessing a member in a collection cannot be found.
            {
                return ("KeyNotFoundException Error Message==> In your Key does not match any key in the collection. pls enter valid key " + ex.Message);
            }
            catch (NotImplementedException ex) //A method or operation is not implemented.
            {
                return ( "NotImplementedException Error Message==>" + ex.Message); 
            }
            catch (OverflowException ex) //An arithmetic, casting, or conversion operation results in an overflow
            {
                return ("OverflowException Error Message==> pls check your operation results in an overflow" + ex.Message); 
            }
            catch (NotSupportedException ex) //A method or operation is not supported.
            {
                return ("NotSupportedException Error Message==>" + ex.Message); 
            }
            catch (PathTooLongException ex) //A path or file name exceeds the maximum system-defined length.
            {
                return ( "PathTooLongException Error Message==>" + ex.Message); 
            }
            catch (TimeoutException ex) //The time interval allotted to an operation has expired.
            {
                return ( "TimeoutExceptionException Error Message==>" + ex.Message); 
            }
            catch (RankException ex) //An array with the wrong number of dimensions is passed to a method.
            {
                return ("RankExceptionException Error Message==>" + ex.Message); 
            }
          

            return model;
        }
    }
}
