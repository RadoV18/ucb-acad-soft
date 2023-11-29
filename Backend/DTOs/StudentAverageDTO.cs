namespace Backend.DTOs;

public record StudentAverageDTO
(
    int Rank,
    string Name,
    string Undergrade,
    int SubjectCount,
    double Average
);
