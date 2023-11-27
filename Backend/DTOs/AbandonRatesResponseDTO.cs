namespace Backend.DTOs;

using Backend.Models;

public record AbandonRatesResponseDTO
(
    List<GraphValues> ByGrades,
    List<GraphValues> ByMonths,
    List<GraphValues> BySubjects
);

