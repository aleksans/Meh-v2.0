using System.ComponentModel.DataAnnotations;

namespace Meh.Models
{
    public class Article
    {
        [Key]
        public int ArticleId { get; set; }

        public string Name { get; set; }

        public string Story { get; set; }
    }
}
