import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Spinner, Image, Button } from 'react-bootstrap';
import { fetchUsers, fetchUserPosts } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        // Fetch all users
        const usersResponse = await fetchUsers();
        const users = usersResponse.users;

        // Get posts from all users
        let allPosts = [];
        
        for (const [userId, username] of Object.entries(users)) {
          const postsResponse = await fetchUserPosts(userId);
          const userPosts = postsResponse.posts.map(post => ({
            ...post,
            username,
            userId,
            timestamp: new Date() // In a real app, use actual post timestamps
          }));
          
          allPosts = [...allPosts, ...userPosts];
        }

        // Sort by timestamp (newest first)
        allPosts.sort((a, b) => b.timestamp - a.timestamp);

        // Pagination
        const paginatedPosts = allPosts.slice(0, page * postsPerPage);
        setPosts(paginatedPosts);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();

    // Set up polling for new posts
    const intervalId = setInterval(() => {
      getFeedPosts();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Card className="my-4">
      <Card.Header as="h5">Recent Posts</Card.Header>
      <Card.Body>
        {loading && posts.length === 0 ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading feed...</p>
          </div>
        ) : (
          <>
            <ListGroup variant="flush">
              {posts.map((post, index) => (
                <ListGroup.Item key={post.id}>
                  <div className="d-flex">
                    <div className="me-3">
                      <Image 
                        src={`https://i.pravatar.cc/50?img=${index}`} 
                        roundedCircle 
                        width={50} 
                        height={50}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6>{post.username}</h6>
                      <p>{post.content}</p>
                      <small className="text-muted">{post.timestamp.toLocaleTimeString()}</small>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="text-center mt-3">
              <Button onClick={loadMore} variant="primary" disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Feed;