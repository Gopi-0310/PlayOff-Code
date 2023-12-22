export const environment = {
  production          : true,
  pepper              : 'UGRObINn.vCsqSseh8KWi.JiTBhQY5XwbAV.aMY9D4GC75dsaaRgy',
  customString        : 'M3OaN8SnrpJO/2rXe.uVeZ32.1xixBmV5I3tCo5WTnChLm4j0C',
  login_url           : 'http://localhost:3000',
  //Role
  SuperAdmin          : 'Professional',
  Admin               : 'Advanced',
  User                : 'Basic',
  //Toastr Messages
  alreadyExists       : 'Credentials already exists',
  invalidCredentials  : 'Invalid Credentials',
  unAuthorized        : 'You\'re not Authorized',
  loggedIn            : 'Successfully Logged In',
  registered          : 'Registered Successfully',
  errorHappened       : 'Something Error Happened',
  sessionExpired      : 'Session Expired',
  sorry               : 'Sorry!',
  tryAgain            : 'Try again later',
  //Regular Expression
  // regex_username      : /^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$/, (accepts only numbers as username)
  regex_email         : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  regex_username      : /^(?!^[\d _.-]+$)[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$/,
  regex_phonenumber   : /^\d{6,15}$/,
  length_username     : /^.{3,25}$/,
  length_phonenumber  : /^.{6,15}$/,
  length_email        : /^.{1,45}$/
};
