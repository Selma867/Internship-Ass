namespace MyRegistrationAPI.DTOs
{
    public class UserResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public AddressDto ResidentialAddress { get; set; } = new AddressDto();
        public AddressDto PostalAddress { get; set; } = new AddressDto();
        public DateTime CreatedAt { get; set; }
    }
}