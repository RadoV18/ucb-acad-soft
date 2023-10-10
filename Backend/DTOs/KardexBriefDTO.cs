namespace Backend.DTOs;

public class KardexBriefDTO {
    public string Concept { get; set; }
    public double Value { get; set; }

    public KardexBriefDTO(string concept, double value) {
        Concept = concept;
        Value = value;
    }
}