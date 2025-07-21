using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Employee.Models;

[Table("EmployeeTbl")]
public partial class EmployeeTbl
{
    [Key]
    public long EmployeeId { get; set; }

    [StringLength(50)]
    public string Firstname { get; set; }

    [StringLength(50)]
    public string Middlename { get; set; }

    [StringLength(50)]
    public string Lastname { get; set; }

    [StringLength(100)]
    public string Address { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Birthday { get; set; }

    [StringLength(50)]
    public string Email { get; set; }

    public short? IsDeleted { get; set; }

    [StringLength(50)]
    public string PhoneNumber { get; set; }

    [StringLength(50)]
    public string Salary { get; set; }

    [StringLength(50)]
    public string Department { get; set; }

    [StringLength(50)]
    public string Position { get; set; }
}
