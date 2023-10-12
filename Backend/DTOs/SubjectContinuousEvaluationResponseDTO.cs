namespace Backend.DTOs
{
    public record SubjectContinuousEvaluationResponseDTO (SubjectsResponseDTO Subject, StudentContinuosEvaluationDTO[] Students);
}
