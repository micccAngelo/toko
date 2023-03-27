import { useEffect, useState } from 'react';
import GetCategories from '../../APIServices/GetCategories';
import { ListGroup, Card } from 'react-bootstrap';
import Loadings from '../../Reusable/Loadings';
import './Category.css';

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="row" style={{ paddingTop: "50px" }}>
      <div className="col-md-4">
        {!loading && (
          <Card className='card'>
            <Card.Header className='card-header'>
              <Card.Title className='category-title'>Categories</Card.Title>
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group no-border">
              {categories.map((category) => (
                <ListGroup.Item 
                  key={category} 
                  action 
                  href="#link1"
                  active={category === selectedCategory}
                  onClick={() => handleCategoryClick(category)}
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
