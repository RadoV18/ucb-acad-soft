namespace Backend.DTOs;

public record SubjectsResponseDTO
(
    string Name,
    string Code,
    string Instructor,
    string Parallel,
    string AcademicPeriod,
    List<ClassItemDTO> Classes
);
