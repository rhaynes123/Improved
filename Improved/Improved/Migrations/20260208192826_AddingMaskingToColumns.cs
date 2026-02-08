using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Improved.Migrations
{
    /// <inheritdoc />
    public partial class AddingMaskingToColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
// Name (string)
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN Name
            ADD MASKED WITH (FUNCTION = 'default()');
        ");

            // Notes (nullable string)
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN Notes
            ADD MASKED WITH (FUNCTION = 'default()');
        ");

            // Date (DateTime)
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN [Date]
            ADD MASKED WITH (FUNCTION = 'default()');
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN Name
            DROP MASKED;
        ");

            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN Notes
            DROP MASKED;
        ");

            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Habits
            ALTER COLUMN [Date]
            DROP MASKED;
        ");
        }
    }
}
