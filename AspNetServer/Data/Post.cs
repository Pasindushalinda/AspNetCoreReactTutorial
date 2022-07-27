using System.ComponentModel.DataAnnotations;

namespace AspNetServer.Data
{
    internal sealed class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = String.Empty;

        [Required]
        [MaxLength(10000)]
        public string Content { get; set; } = String.Empty;
    }
}
