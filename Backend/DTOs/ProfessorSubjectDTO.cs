namespace Backend.DTOs;

public class ProfessorSubjectDTO
{
     public ProfessorInfoDTO Professor { get; set; } = default!;
     public List<SimpleSubjectDTO> Subjects { get; set; } = default!;
     public ProfessorSubjectDTO(ProfessorInfoDTO professor, List<SimpleSubjectDTO> subjects)
     {
         Professor = professor;
         Subjects = subjects;
     }
}

