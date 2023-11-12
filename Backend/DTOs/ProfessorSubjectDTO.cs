namespace Backend.DTOs;

public class ProfessorSubjectDTO
{
     public ProfessorInfoDTO Professor { get; set; } = default!;
     public List<SubjectPartialDTO> Subjects { get; set; } = default!;
     public ProfessorSubjectDTO(ProfessorInfoDTO professor, List<SubjectPartialDTO> subjects)
     {
         Professor = professor;
         Subjects = subjects;
     }
}

