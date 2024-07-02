import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchArticle = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}&category=${category}`);
      setArticles(response.data);
    } catch (error) {
      setError('Error fetching articles');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [query, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <>
    <Container>
      <h2 className="my-4">Search Articles</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="formQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category...</option>
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Position">Position</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.category}</td>
              <td>
                <Link to={`/view/${article._id}`} className="btn btn-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default SearchArticle;
