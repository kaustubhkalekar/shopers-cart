import React, {
  Fragment,
  // useEffect, useState
} from "react";
import { Row, Col } from "react-bootstrap";
// import axios from 'axios';
// import products from '../products';
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  // useEffect(()=>{
  //   const fetchProducts = async()=>{
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data)
  //   }

  //   fetchProducts();
  // },[])

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <Fragment>
      {isLoading ? (
        // <h2>Loading....</h2>
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest products</h1>

          {console.log("products:", products)}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Fragment>
  );
};

export default HomeScreen;
