using Improved.Data;
using Improved.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Improved.Pages;

public class AllHabits : PageModel
{
    public List<Habit> Habits { get; set; } = [];
    
    private ApplicationDbContext _context;

    public AllHabits(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IActionResult> OnGet()
    {
        Habits = await _context.Habits
            .AsNoTracking()
            .ToListAsync();
        return Page();
    }
}