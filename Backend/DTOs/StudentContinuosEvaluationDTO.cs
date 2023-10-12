namespace Backend.DTOs;

public record StudentContinuosEvaluationDTO(string Name, ContinuousEvaluationDTO[] ContinuousEvaluation, int FinalGrade);