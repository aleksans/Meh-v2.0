using Microsoft.Data.Entity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using Meh.Models;

namespace Meh.Repository
{
    public static class DbDefaultData
    {
        public static void Initialize(IServiceProvider provider)
        {
            var context = provider.GetService<ApplicationDbContext>();
            context.Database.Migrate();

            if (!context.Article.Any())
            {
                context.Article.AddRange(new Article
                {
                    Name = "Article Number 1",
                    Story = "Some full Description"
                },
                
                new Article
                {
                    Name = "Article Number 2",
                    Story = "Some full story"
                });

                context.SaveChanges();
            }
        }
    }
}
