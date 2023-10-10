namespace Backend.DTOs;

public class SubjectDTO
{
    public string Site { get; set; }
    public string CareerSail { get; set; }
    public string SubjectSail { get; set; }
    public string SubjectName { get; set; }
    public int Parallel { get; set; }
    public int AcademicCredits { get; set; }
    public int EconomicCredits { get; set; }
    public int ContinuousScore { get; set; }
    public ReferenceDTO Reference { get; set; }
    public int FinalTestScore { get; set; }
    public int FinalScore { get; set; }

    public SubjectDTO(string site, string careerSail, string subjectSail, string subjectName, int parallel,
        int academicCredits, int economicCredits, int continuousScore, ReferenceDTO reference, int finalTestScore,
        int finalScore
    )
    {
        Site = site;
        CareerSail = careerSail;
        SubjectSail = subjectSail;
        SubjectName = subjectName;
        Parallel = parallel;
        AcademicCredits = academicCredits;
        EconomicCredits = economicCredits;
        ContinuousScore = continuousScore;
        Reference = reference;
        FinalTestScore = finalTestScore;
        FinalScore = finalScore;
    }

}