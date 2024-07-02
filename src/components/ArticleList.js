import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
console.log(articles, '<===')
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response = await axios.get('http://localhost:5000/api/getAllarticles');
    setArticles(response.data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/api/search?query=${query}&category=${category}`);
    setArticles(response.data);
  };

  const handleDelete = async (_id) => {
    console.log(_id, '<===_id')
    try {
      await axios.delete(`http://localhost:5000/api/deleteArticles/${_id}`);
      // After deletion, fetch the updated list of articles
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Educations">Educations</option>
              <option value="Businessmen">Businessmen</option>
              <option value="Positions">Positions</option>
            </Form.Control>
          </Col>
          <Col>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {articles.map((article) => (
          <Col key={article._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Link to={`/view/${article._id}`}>
                  <Button variant="primary">View</Button>
                </Link>
                <Link to={`/edit/${article._id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(article._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ArticleList;
