namespace Backend.DTOs;

public record EvaluatedProfessor
(
    int Rank,
    string Name,
    List<string> Departments,
    int SubjectCount,
    double Average
);