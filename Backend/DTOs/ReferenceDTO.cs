namespace Backend.DTOs;

public class ReferenceDTO
{
    public int Semester {get; set;}
    public int Year {get; set;}
    public int Turn {get; set;}

    public ReferenceDTO(int semester, int year, int turn)
    {
        Semester = semester;
        Year = year;
        Turn = turn;
    }
}