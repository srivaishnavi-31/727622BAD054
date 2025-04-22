import React from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from './components/CustomNavbar'; // Make sure this matches your actual filename
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <Container className="my-4">
        <section id="top-users">
          <TopUsers />
        </section>
        <section id="trending-posts">
          <TrendingPosts />
        </section>
        <section id="feed">
          <Feed />
        </section>
      </Container>
    </div>
  );
}

export default App;
