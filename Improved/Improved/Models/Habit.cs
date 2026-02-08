using System.ComponentModel.DataAnnotations;

namespace Improved.Models;

public class Habit
{
    [Key]
    public int Id { get; set; }
    [StringLength(50)]
    public required string Name { get; set; }
    public string? Notes { get; set; }
    public DateTime Date { get; init; } = DateTime.Now;
}
/*
 * SELECT  
       u.name  AS UserName,
       r.name  AS RoleName
   FROM sys.database_principals u
   LEFT JOIN sys.database_role_members rm
       ON u.principal_id = rm.member_principal_id
   LEFT JOIN sys.database_principals r
       ON rm.role_principal_id = r.principal_id
   WHERE u.type IN ('S', 'U', 'G') -- SQL user, Windows user, Windows group
   ORDER BY u.name, r.name;
   
   -- SELECT 
   --     c.name,
   --     c.is_masked,
   --     c.masking_function
   -- FROM sys.columns c
   -- WHERE object_id = OBJECT_ID('dbo.Habits');
   
   USE master;
   -- GO
   
   -- User who should see MASKED data
   CREATE LOGIN MaskedUserLogin
   WITH PASSWORD = 'TestPassword!123',
        CHECK_POLICY = OFF;
   -- GO
   
   -- User who should see UNMASKED data
   CREATE LOGIN UnmaskedUserLogin
   WITH PASSWORD = 'TestPassword!123',
        CHECK_POLICY = OFF;
   -- GO
   
   USE Improve;
   -- GO
   
   CREATE USER MaskedUser FOR LOGIN MaskedUserLogin;
   CREATE USER UnmaskedUser FOR LOGIN UnmaskedUserLogin;
   -- GO
   
   REVOKE UNMASK FROM PUBLIC;
   -- GO
   
   GRANT SELECT ON dbo.Habits TO MaskedUser;
   GRANT SELECT ON dbo.Habits TO UnmaskedUser;
   -- GO
   
   GRANT UNMASK TO UnmaskedUser;
   -- GO
   
   
*/