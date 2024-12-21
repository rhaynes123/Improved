using System.ComponentModel.DataAnnotations;

namespace Improved.Models;

public class Habit
{
    [Key]
    public int Id { get; set; }
    [StringLength(50)]
    public required string Name { get; set; }
    public DateTime Date { get; init; } = DateTime.Now;
}