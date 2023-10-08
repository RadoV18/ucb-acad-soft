using System.Globalization;
using System.Text;
using Backend.DTOs;

namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("api/v1/reports/students")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly Services.StudentAndProfessorService _studentAndProfessorService =
        new Services.StudentAndProfessorService();

    private readonly Services.SubjectAndSemesterGradeService _subjectAndSemesterGradeService =
        new Services.SubjectAndSemesterGradeService();

    private readonly Services.MinioService _minioService = new Services.MinioService();

    [HttpGet("subjects/{subjectId:int}")]
    public async Task<ActionResult<ResponseDTO<List<StudentInfoDTO>>>> GetStudents(int subjectId,
        [FromQuery] int semesterId)
    {
        try
        {
            // Get students sorted by last name and first name
            var students =
                await _studentAndProfessorService.GetStudentsInfoBySubjectIdAndSemesterId(subjectId, semesterId);
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
            var students =
                await _studentAndProfessorService.GetStudentsInfoBySubjectIdAndSemesterId(subjectId, semesterId);
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
                csv.AppendLine(
                    $"{index},{student.Ci},{student.LastName} {student.FirstName},{student.Email},{student.Phone},{student.Major},{(!student.IsActive ? "SI" : "NO")}");
                index++;
            }
            
            // Upload CSV to Minio
            var fileName = $"students-{subjectId}-{semesterId}.csv";
            var newFileDto =
                await _minioService.UploadFile("csv", fileName, Encoding.UTF8.GetBytes(csv.ToString()), "text/csv");
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
    public async Task<ActionResult<ResponseDTO<List<StudentAttendanceDTO>>>> GetStudentsAttendance(int subjectId,
        [FromQuery] int semesterId)
    {
        try
        {
            // Get students attendance
            var studentsAttendance =
                await _studentAndProfessorService.GetStudentAttendanceBySubjectIdAndSemesterId(subjectId, semesterId);
            return Ok(new ResponseDTO<List<StudentAttendanceDTO>>
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

    // Get the resume of the attendance of all the students in a subject (number of attendances, absences, and attendance grade over 10)   
    [HttpGet("subjects/{subjectId:int}/attendances/resumes")]
    public async Task<ActionResult<ResponseDTO<List<StudentAttendanceResumeDTO>>>> GetStudentsAttendanceResume(
        int subjectId, [FromQuery] int semesterId)
    {
        try
        {
            // Get students attendance
            var studentsAttendance =
                await _studentAndProfessorService.GetStudentAttendanceBySubjectIdAndSemesterId(subjectId, semesterId);
            // Create resume
            var studentsAttendanceResume = new List<StudentAttendanceResumeDTO>();
            Dictionary<string, StudentAttendanceResumeDTO> attendanceDict =
                new Dictionary<string, StudentAttendanceResumeDTO>();
            foreach (var date in studentsAttendance)
            {
                foreach (var student in date.Students)
                {
                    string studentName = $"{student.Lastname} {student.Firstname}";
                    if (!attendanceDict.ContainsKey(studentName))
                    {
                        attendanceDict[studentName] = new StudentAttendanceResumeDTO
                        {
                            FullName = studentName,
                            NumberOfAttendances = 0,
                            NumberOfAbsences = 0,
                            AttendancePercentage = 0,
                            AttendanceScore = 0
                        };
                    }

                    if (student.Attendance)
                    {
                        attendanceDict[studentName].NumberOfAttendances++;
                    }
                    else
                    {
                        attendanceDict[studentName].NumberOfAbsences++;
                    }
                }
            }

            // Calculate attendance percentage and score
            foreach (var studentAttendanceResume in attendanceDict.Values)
            {
                studentAttendanceResume.AttendancePercentage =
                    Math.Round((double)studentAttendanceResume.NumberOfAttendances /
                               (studentAttendanceResume.NumberOfAttendances +
                                studentAttendanceResume.NumberOfAbsences) *
                               100, 2);
                studentAttendanceResume.AttendanceScore =
                    Math.Round(studentAttendanceResume.AttendancePercentage / 10, 2);
            }

            // Sort by last name and first name
            var studentsAttendanceResumeList = attendanceDict.Values.ToList();
            studentsAttendanceResumeList.Sort((student1, student2) =>
            {
                var lastNameComparison = string.Compare(student1.FullName, student2.FullName, StringComparison.Ordinal);
                if (lastNameComparison != 0) return lastNameComparison;
                return string.Compare(student1.FullName, student2.FullName, StringComparison.Ordinal);
            });
            return Ok(new ResponseDTO<List<StudentAttendanceResumeDTO>>
            (
                studentsAttendanceResumeList,
                null,
                true
            ));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // Export the resume of the attendance of all the students in a subject (number of attendances, absences, and attendance grade over 10) to a CSV file
    [HttpGet("csv/subjects/{subjectId:int}/attendances/resumes")]
    public async Task<ActionResult<ResponseDTO<NewFileDTO>>> GetStudentsAttendanceResumeCsv(int subjectId,
        [FromQuery] int semesterId)
    {
        try
        {
            // Get students attendance
            var studentsAttendance =
                await _studentAndProfessorService.GetStudentAttendanceBySubjectIdAndSemesterId(subjectId, semesterId);
            // Create resume
            var studentsAttendanceResume = new List<StudentAttendanceResumeDTO>();
            Dictionary<string, StudentAttendanceResumeDTO> attendanceDict =
                new Dictionary<string, StudentAttendanceResumeDTO>();
            foreach (var date in studentsAttendance)
            {
                foreach (var student in date.Students)
                {
                    string studentName = $"{student.Lastname} {student.Firstname}";
                    if (!attendanceDict.ContainsKey(studentName))
                    {
                        attendanceDict[studentName] = new StudentAttendanceResumeDTO
                        {
                            FullName = studentName,
                            NumberOfAttendances = 0,
                            NumberOfAbsences = 0,
                            AttendancePercentage = 0,
                            AttendanceScore = 0
                        };
                    }

                    if (student.Attendance)
                    {
                        attendanceDict[studentName].NumberOfAttendances++;
                    }
                    else
                    {
                        attendanceDict[studentName].NumberOfAbsences++;
                    }
                }
            }

            // Calculate attendance percentage and score
            foreach (var studentAttendanceResume in attendanceDict.Values)
            {
                studentAttendanceResume.AttendancePercentage =
                    Math.Round((double)studentAttendanceResume.NumberOfAttendances /
                               (studentAttendanceResume.NumberOfAttendances +
                                studentAttendanceResume.NumberOfAbsences) *
                               100, 2);
                studentAttendanceResume.AttendanceScore =
                    Math.Round(studentAttendanceResume.AttendancePercentage / 10, 2);
            }

            // Sort by last name and first name
            var studentsAttendanceResumeList = attendanceDict.Values.ToList();
            studentsAttendanceResumeList.Sort((student1, student2) =>
            {
                var lastNameComparison = string.Compare(student1.FullName, student2.FullName, StringComparison.Ordinal);
                if (lastNameComparison != 0) return lastNameComparison;
                return string.Compare(student1.FullName, student2.FullName, StringComparison.Ordinal);
            });
            // Create CSV
            var csv = new StringBuilder();
            var index = 1;
            
            // Headers
            csv.AppendLine("No,APELLIDOS Y NOMBRES,ASISTENCIAS, FALTAS, PORCENTAJE, NOTA");
            foreach (var studentAttendanceResume in studentsAttendanceResumeList)
            {
                var attendancePercentageAsString = studentAttendanceResume.AttendancePercentage.ToString(new CultureInfo("en-US"));
                var attendanceScoreAsString = studentAttendanceResume.AttendanceScore.ToString(new CultureInfo("en-US"));
                csv.AppendLine(
                    $"{index},{studentAttendanceResume.FullName},{studentAttendanceResume.NumberOfAttendances},{studentAttendanceResume.NumberOfAbsences},{attendancePercentageAsString},{attendanceScoreAsString}");
                index++;
            }
            
            // Upload CSV to Minio
            var fileName = $"students-attendance-resume-{subjectId}-{semesterId}.csv";
            var newFileDto =
                await _minioService.UploadFile("csv", fileName, Encoding.UTF8.GetBytes(csv.ToString()), "text/csv");
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
}
                