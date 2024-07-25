import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import axios from "axios";
import { useEffect } from "react";

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const productChunks = chunkArray(products, 6);

  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-banner"
          src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
          alt=""
        ></img>

        {productChunks.map((chunk, index) => (
          <div key={index} className="home-row">
            {chunk.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        ))}


      </div>
    </div>
  );
}

export default Home;
