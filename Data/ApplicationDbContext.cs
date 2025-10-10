using Microsoft.EntityFrameworkCore;
using MyRegistrationAPI.Models;

namespace MyRegistrationAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ResidentialAddress> ResidentialAddresses { get; set; }
        public DbSet<PostalAddress> PostalAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.PhoneNumber).IsUnique();
            });

            modelBuilder.Entity<ResidentialAddress>(entity =>
            {
                entity.HasOne(ra => ra.User)
                      .WithOne(u => u.ResidentialAddress)
                      .HasForeignKey<ResidentialAddress>(ra => ra.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PostalAddress>(entity =>
            {
                entity.HasOne(pa => pa.User)
                      .WithOne(u => u.PostalAddress)
                      .HasForeignKey<PostalAddress>(pa => pa.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}