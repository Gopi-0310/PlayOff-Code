using BCrypt.Net;
using System.Threading.Channels;
string passwordHash = BCrypt.Net.BCrypt.HashPassword("Reni@123");
Console.WriteLine("hello");
Console.WriteLine(passwordHash);