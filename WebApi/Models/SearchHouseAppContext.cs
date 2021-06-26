using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HouseViewer.Models
{
    public partial class SearchHouseAppContext : DbContext
    {
        public SearchHouseAppContext()
        {
        }

        public SearchHouseAppContext(DbContextOptions<SearchHouseAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<House> Houses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            modelBuilder.Entity<House>(entity =>
            {
                entity.ToTable("house");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Area).HasColumnName("area");

                entity.Property(e => e.Carport)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("carport");

                entity.Property(e => e.Comment)
                    .HasMaxLength(255)
                    .HasColumnName("comment");

                entity.Property(e => e.DataFrom)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("data_from");

                entity.Property(e => e.FavoriteRanking).HasColumnName("favorite_ranking");

                entity.Property(e => e.Floor)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("floor");

                entity.Property(e => e.HouseAge).HasColumnName("house_age");

                entity.Property(e => e.Kind)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("kind");

                entity.Property(e => e.Link)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("link");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.RecordTime)
                    .HasColumnType("datetime")
                    .HasColumnName("record_time");

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("region");

                entity.Property(e => e.Room)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("room");

                entity.Property(e => e.Section)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("section");

                entity.Property(e => e.Shape)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("shape");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("status");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("type");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
