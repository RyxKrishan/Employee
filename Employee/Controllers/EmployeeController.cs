using Employee.Models;
using Employee.NewFolder;
using Employee.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ApplicationDbContext _context; 
        public EmployeeController(ApplicationDbContext context,IEmployeeRepository employeeRepository)
        {
            _context = context;
            _employeeRepository = employeeRepository;
        }
        [HttpGet("EmployeeList")]
        public async Task<IActionResult> EmployeeList()
        {
            try
            {
                var list = await _employeeRepository.GetAllEmployeesSP();
                return Ok(new { data = list, success = true });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeTbl model)
        {
            try
            {
                var request = new EmployeeTbl
                {
                    Firstname = model.Firstname,
                    Middlename = model.Middlename,
                    Lastname = model.Lastname,
                    Email = model.Email,
                    Address = model.Address,
                    Birthday = model.Birthday,
                    PhoneNumber = model.PhoneNumber,
                    Salary  = model.Salary,
                    Department = model.Department,
                    Position = model.Position,
                };

                _context.Add(request);
                await _context.SaveChangesAsync();
                return Ok(new { data = request, success = true });
            }
            catch (Exception)
            {

                return BadRequest();
            }
            finally
            {
            }
        }
        [HttpDelete("DeleteEmployee/{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            var employee = await _context.EmployeeTbls.FirstOrDefaultAsync(i=>i.EmployeeId == employeeId);

            if (employee == null)
            {
                return NotFound(new { success = false, message = "Employee not found" });
            }

            _context.EmployeeTbls.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Employee deleted successfully" });
        }
        [HttpGet("ViewEmployee/{employeeId}")]
        public async Task<IActionResult> ViewEmployee(int employeeId)
        {
            var employee = await _context.EmployeeTbls.FirstOrDefaultAsync(i => i.EmployeeId == employeeId);

            if (employee == null)
            {
                return NotFound(new { success = false, message = "Employee not found" });
            }


            return Ok(new { success = true, message = "Employee found",data= employee });
        }
        [HttpPut("UpdateEmployee/{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeTbl emp)
        {
            var existing = await _context.EmployeeTbls.FirstOrDefaultAsync(i=>i.EmployeeId == id);

            if (existing == null)
            {
                return NotFound(new { success = false, message = "Employee not found" });
            }

            existing.Firstname = emp.Firstname;
            existing.Middlename = emp.Middlename;
            existing.Lastname = emp.Lastname;
            existing.Address = emp.Address;
            existing.Birthday = emp.Birthday;
            existing.Email = emp.Email;
            existing.PhoneNumber = emp.PhoneNumber;
            existing.Salary = emp.Salary;
            existing.Department = emp.Department;
            existing.Position = emp.Position;

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Employee updated successfully" });
        }

    }
}
