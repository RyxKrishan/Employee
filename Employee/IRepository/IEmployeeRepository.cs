using Employee.Models;

namespace Employee.NewFolder
{
    public interface IEmployeeRepository
    {
        Task<List<EmployeeTbl>> GetAllEmployeesSP();
    }
}
