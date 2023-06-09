import { useEffect, useState } from 'react';
import GetCategories from '../../APIServices/GetCategories';
import { ListGroup, Card } from 'react-bootstrap';
import Loadings from '../../Reusable/Loadings';
import './Category.css';

function Category({ handleCategorySelect, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  
  return (
    <div className="row" style={{ paddingTop: "50px", position: "fixed", left: 0 }}>
      <div className="col-md-4">
        {!loading && (
          <Card className='card'>
            <Card.Header className='card-header'>
              <Card.Title className='category-title category-sidebar'>Categories</Card.Title>
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group no-border" style={{ overflowY: "scroll", maxHeight: "80vh" }}>
              {categories.map((category) => (
                <ListGroup.Item 
                  key={category} 
                  action 
                  active={category === selectedCategory}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
        {loading && <Loadings variant="danger" />}
      </div>
    </div>
  );
}

export default Category;
