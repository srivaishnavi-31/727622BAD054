import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Spinner, Image } from 'react-bootstrap';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrendingPosts = async () => {
      setLoading(true);
      try {
        // Fetch all users
        const usersResponse = await fetchUsers();
        const users = usersResponse.users;

        // Process each user's posts to get comment counts
        let allPosts = [];
        
        for (const [userId, username] of Object.entries(users)) {
          const postsResponse = await fetchUserPosts(userId);
          const posts = postsResponse.posts;

          // Get comment counts for each post
          for (const post of posts) {
            const commentsResponse = await fetchPostComments(post.id);
            const commentCount = commentsResponse.comments.length;
            
            allPosts.push({
              ...post,
              username,
              userId,
              commentCount
            });
          }
        }

        // Find the maximum comment count
        const maxComments = Math.max(...allPosts.map(post => post.commentCount));

        // Filter posts with max comments
        const trending = allPosts.filter(post => post.commentCount === maxComments);

        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);

  return (
    <Card className="my-4">
      <Card.Header as="h5">Trending Posts</Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading trending posts...</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {trendingPosts.map((post, index) => (
              <ListGroup.Item key={post.id}>
                <div className="d-flex">
                  <div className="me-3">
                    <Image 
                      src={`https://picsum.photos/100/100?random=${index}`} 
                      rounded 
                      width={100} 
                      height={100}
                    />
                  </div>
                  <div>
                    <h6>{post.username}</h6>
                    <p>{post.content}</p>
                    <small className="text-muted">{post.commentCount} comments</small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default TrendingPosts;