using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AspNetServer.Data
{
    internal static class PostRepository
    {
        internal async static Task<List<Post>> GetPostsAsync()
        {
            using var db = new AppDbContext();
            return await db.Posts.ToListAsync();
        }

        internal async static Task<Post> GetPostByIdAsync(int postId)
        {
            using var db = new AppDbContext();
            return await db.Posts
                .FirstOrDefaultAsync(x => x.PostId == postId);
        }

        internal async static Task<bool> CreateAsync(Post post)
        {
            using var db = new AppDbContext();
            try
            {
                await db.Posts.AddAsync(post);
                return await db.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        internal async static Task<bool> UpdateAsync(Post post)
        {
            using var db = new AppDbContext();
            try
            {
                db.Posts.Update(post);
                return await db.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        internal async static Task<bool> DeleteAsync(int postId)
        {
            using var db = new AppDbContext();
            try
            {
                var post = await GetPostByIdAsync(postId);
                db.Posts.Remove(post);
                return await db.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}