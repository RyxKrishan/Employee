using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Employee.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EmployeeTbl> EmployeeTbls { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-FOFU286;Initial Catalog=Employee;Persist Security Info=True;User ID=sa;Password=password;Trust Server Certificate=True;Command Timeout=300");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeTbl>(entity =>
        {
            entity.Property(e => e.IsDeleted).HasDefaultValue((short)0);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    internal async Task FirstOrDefaultAsync(Func<object, object> value)
    {
        throw new NotImplementedException();
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
