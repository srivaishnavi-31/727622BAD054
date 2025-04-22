const API_BASE = 'http://20.244.56.144/evaluation-service';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: {} };
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}/posts`);
    if (!response.ok) throw new Error(`Failed to fetch posts for user ${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [] };
  }
};

export const fetchPostComments = async (postId) => {
  try {
    const response = await fetch(`${API_BASE}/posts/${postId}/comments`);
    if (!response.ok) throw new Error(`Failed to fetch comments for post ${postId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { comments: [] };
  }
};