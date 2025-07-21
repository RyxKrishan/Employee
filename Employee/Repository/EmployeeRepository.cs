using Employee.Models;
using Employee.NewFolder;
using Microsoft.EntityFrameworkCore;

namespace Employee.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public Task<List<EmployeeTbl>> GetAllEmployeesSP()
        {
            return _context.EmployeeTbls.FromSqlRaw("EXEC EmployeeList").ToListAsync();
        }
    }
}
