namespace Backend.DTOs;

public class SemesterSummaryDTO
{
    public string AcademicPeriod { get; set; }
    public string InitSemester { get; set; }
    public string EndSemester { get; set; }
    public string Career { get; set; }
    public List<SubjectDTO> Subjects { get; set; }
    public int TotalCredits { get; set; }
    public double Average { get; set; }

    public SemesterSummaryDTO(string academicPeriod, string initSemester,
        string endSemester, string career, List<SubjectDTO> subjects, int totalCredits, double average
    )
    {
        AcademicPeriod = academicPeriod;
        InitSemester = initSemester;
        EndSemester = endSemester;
        Career = career;
        Subjects = subjects;
        TotalCredits = totalCredits;
        Average = average;
    }
}