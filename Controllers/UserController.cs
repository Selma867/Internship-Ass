using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyRegistrationAPI.Data;
using MyRegistrationAPI.DTOs;
using MyRegistrationAPI.Models;

namespace MyRegistrationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ApplicationDbContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register(UserRegistrationDto registrationDto)
        {
            try
            {
                // Check if email already exists
                if (await _context.Users.AnyAsync(u => u.Email == registrationDto.Email))
                {
                    return BadRequest(new { message = "Email already exists" });
                }

                // Check if phone number already exists
                if (await _context.Users.AnyAsync(u => u.PhoneNumber == registrationDto.PhoneNumber))
                {
                    return BadRequest(new { message = "Phone number already exists" });
                }

                // Create new user
                var user = new User
                {
                    FirstName = registrationDto.FirstName,
                    LastName = registrationDto.LastName,
                    Email = registrationDto.Email,
                    PhoneNumber = registrationDto.PhoneNumber,
                    DateOfBirth = registrationDto.DateOfBirth.ToUniversalTime(),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                // Add residential address
                user.ResidentialAddress = new ResidentialAddress
                {
                    Street = registrationDto.ResidentialAddress.Street,
                    City = registrationDto.ResidentialAddress.City,
                    State = registrationDto.ResidentialAddress.State,
                    PostalCode = registrationDto.ResidentialAddress.PostalCode,
                    Country = registrationDto.ResidentialAddress.Country
                };

                // Add postal address
                user.PostalAddress = new PostalAddress
                {
                    Street = registrationDto.PostalAddress.Street,
                    City = registrationDto.PostalAddress.City,
                    State = registrationDto.PostalAddress.State,
                    PostalCode = registrationDto.PostalAddress.PostalCode,
                    Country = registrationDto.PostalAddress.Country
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var responseDto = MapToUserResponseDto(user);
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, responseDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during user registration");
                return StatusCode(500, new { message = "An error occurred during registration" });
            }
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUser(int id)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.ResidentialAddress)
                    .Include(u => u.PostalAddress)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var responseDto = MapToUserResponseDto(user);
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching user");
                return StatusCode(500, new { message = "An error occurred while fetching user" });
            }
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers()
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.ResidentialAddress)
                    .Include(u => u.PostalAddress)
                    .OrderByDescending(u => u.CreatedAt)
                    .ToListAsync();

                var responseDtos = users.Select(MapToUserResponseDto).ToList();
                return Ok(responseDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching users");
                return StatusCode(500, new { message = "An error occurred while fetching users" });
            }
        }

        private static UserResponseDto MapToUserResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                ResidentialAddress = new AddressDto
                {
                    Street = user.ResidentialAddress?.Street ?? string.Empty,
                    City = user.ResidentialAddress?.City ?? string.Empty,
                    State = user.ResidentialAddress?.State ?? string.Empty,
                    PostalCode = user.ResidentialAddress?.PostalCode ?? string.Empty,
                    Country = user.ResidentialAddress?.Country ?? string.Empty
                },
                PostalAddress = new AddressDto
                {
                    Street = user.PostalAddress?.Street ?? string.Empty,
                    City = user.PostalAddress?.City ?? string.Empty,
                    State = user.PostalAddress?.State ?? string.Empty,
                    PostalCode = user.PostalAddress?.PostalCode ?? string.Empty,
                    Country = user.PostalAddress?.Country ?? string.Empty
                },
                CreatedAt = user.CreatedAt
            };
        }
    }
}