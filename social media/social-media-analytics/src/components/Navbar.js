import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Social Media Analytics</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="#top-users">Top Users</Nav.Link>
        <Nav.Link as={Link} to="#trending-posts">Trending Posts</Nav.Link>
        <Nav.Link as={Link} to="#feed">Feed</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;
