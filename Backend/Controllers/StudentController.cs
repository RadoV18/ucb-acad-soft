using System.Text;
using Backend.DTOs;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/students")]
[ApiController]
public class StudentController: ControllerBase
{
    private readonly Services.StudentAndProfessorService _studentAndProfessorService = new Services.StudentAndProfessorService();
    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService = new Services.SubjectAndSemesterGradeService();
    private readonly Services.MinioService _minioService = new Services.MinioService();
    
    [HttpGet("subjects/{subjectId:int}")]
    public async Task<ActionResult<ResponseDTO<List<StudentInfoDTO>>>> GetStudents(int subjectId, [FromQuery] int semesterId)
    {
        try
        {
            // Get students sorted by last name and first name
            var students = await _studentAndProfessorService.GetStudentsInfoBySubjectIdAndSemesterId(subjectId, semesterId);
            students.Sort((student1, student2) =>
            {
                var lastNameComparison = string.Compare(student1.LastName, student2.LastName, StringComparison.Ordinal);
                if (lastNameComparison != 0) return lastNameComparison;
                return string.Compare(student1.FirstName, student2.FirstName, StringComparison.Ordinal);
            });
            return Ok(new ResponseDTO<List<StudentInfoDTO>> 
                (
                    students,
                    null,
                    true
                ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("csv/subjects/{subjectId:int}")]
    public async Task<ActionResult<ResponseDTO<NewFileDTO>>> GetStudentsCsv(int subjectId, [FromQuery] int semesterId)
    {
        try
        {
            // Get students sorted by last name and first name
            var students = await _studentAndProfessorService.GetStudentsInfoBySubjectIdAndSemesterId(subjectId, semesterId);
            students.Sort((student1, student2) =>
            {
                var lastNameComparison = string.Compare(student1.LastName, student2.LastName, StringComparison.Ordinal);
                if (lastNameComparison != 0) return lastNameComparison;
                return string.Compare(student1.FirstName, student2.FirstName, StringComparison.Ordinal);
            });
            // Create CSV
            var csv = new StringBuilder();
            var index = 1;
            // Headers
            csv.AppendLine("No,CI,APELLIDOS Y NOMBRES,EMAIL, TELEFONO, CARRERA, ABANDONO");
            foreach (var student in students)
            { 
                csv.AppendLine($"{index},{student.Ci},{student.LastName} {student.FirstName},{student.Email},{student.Phone},{student.Major},{(!student.IsActive ? "SI" : "NO")}");
                index++;
            }
            // Upload CSV to Minio
            var fileName = $"students-{subjectId}-{semesterId}.csv";
            var newFileDto = await _minioService.UploadFile("csv", fileName, Encoding.UTF8.GetBytes(csv.ToString()), "text/csv");
            return Ok(new ResponseDTO<NewFileDTO> 
                (
                    newFileDto,
                    null,
                    true
                ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("subjects/{subjectId:int}/attendances")]
    public async Task<ActionResult<ResponseDTO<List<StudentAtendanceDTO>>>> GetStudentsAttendance(int subjectId, [FromQuery] int semesterId)
    {
        try
        {
            // Get students attendance
            var studentsAttendance = await _studentAndProfessorService.GetStudentAttendanceBySubjectIdAndSemesterId(subjectId, semesterId);
            return Ok(new ResponseDTO<List<StudentAtendanceDTO>> 
                (
                    studentsAttendance,
                    null,
                    true
                ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}