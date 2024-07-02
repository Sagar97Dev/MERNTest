import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const _idView = () => {
  const { _id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getSinglearticles/${_id}`);
        setArticle(response.data);
      } catch (error) {
        setError('Article not found');
      }
      setLoading(false);
    };

    fetchArticle();
  }, [_id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <>
    <Container>
      <h2>View Article</h2>
      <Card>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
          <Card.Text>Category: {article.category}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default _idView;
