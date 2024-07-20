import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import axios from "axios";
import { useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-banner"
          src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
          alt=""
        ></img>

        <div className="home-row">
          <Product
            id={"669bf6112c410460c4ce8294"}
            image={
              "https://m.media-amazon.com/images/I/91nIFrmIsUL._AC_SY879_.jpg"
            }
            title={"Pure Zari Work Womens Banarasi Silk Saree"}
            price={700}
            rating={5}
          />

          <Product
            id={"669bf6d02c410460c4d070d1"}
            image={
              "https://m.media-amazon.com/images/I/71re-nssU7L._AC_SY695_.jpg"
            }
            title={
              "Mens Watch Black Blue Minimalist Waterproof Casual Quartz Watches"
            }
            price={1000}
            rating={4}
          />

          <Product
            id={3}
            image={
              "https://m.media-amazon.com/images/I/61HTE-em06L._AC_SL1500_.jpg"
            }
            title={"Preschool Toddler Backpack For Boys Girls"}
            price={500}
            rating={5}
          />

          <Product
            id={4}
            image={
              "https://m.media-amazon.com/images/I/516dIgu0ZbL._AC_SL1500_.jpg"
            }
            title={"LED Desk Lamp with Dual USB Charging Ports"}
            price={600}
            rating={4}
          />

          <Product
            id={5}
            image={
              "https://m.media-amazon.com/images/I/61YNpJ7S7US._AC_SL1500_.jpg"
            }
            title={"Velvet Round Ottoman Modern Dressing Stool"}
            price={2000}
            rating={5}
          />

          <Product
            id={6}
            image={
              "https://m.media-amazon.com/images/I/81Xwf3nalUL._AC_SL1500_.jpg"
            }
            title={"Wireless Bluetooth Karaoke Microphone with LED Lights"}
            price={1500}
            rating={5}
          />
        </div>

        <div className="home-row">
          <Product
            id={7}
            image={
              "https://m.media-amazon.com/images/I/71NXowebfKL._AC_SL1500_.jpg"
            }
            title={" Digital Camera, 4k Cameras for Photography & Video"}
            price={25000}
            rating={4}
          />

          <Product
            id={8}
            image={
              "https://m.media-amazon.com/images/I/61anBuiHUhL._AC_SX679_.jpg"
            }
            title={"Electric Food Mixer"}
            price={2000}
            rating={5}
          />

          <Product
            id={9}
            image={
              "https://m.media-amazon.com/images/I/71m7N37l2EL._SL1500_.jpg"
            }
            title={"Color Nymph Beginner Makeup Kit For Teens"}
            price={500}
            rating={5}
          />

          <Product
            id={10}
            image={
              "https://m.media-amazon.com/images/I/714KPddSBCL._AC_SL1500_.jpg"
            }
            title={"Aromatherapy Candle with Crystals Inside"}
            price={250}
            rating={4}
          />

          <Product
            id={11}
            image={
              "https://m.media-amazon.com/images/I/71SxZJGetBL._AC_SY695_.jpg"
            }
            title={"Centipede Demon Kids Water Shoes for Girls Boys"}
            price={250}
            rating={5}
          />

          <Product
            id={12}
            image={
              "https://m.media-amazon.com/images/I/91DrwRxajpL._AC_SL1500_.jpg"
            }
            title={"Microfiber Cleaning Cloth,Pack of 12,Size:12.6"}
            price={400}
            rating={4}
          />
        </div>

        <div className="home-row">
          <Product
            id={13}
            image={
              "https://m.media-amazon.com/images/I/61E1qihZ55L._AC_SL1500_.jpg"
            }
            title={"Artificial Flowers Bouquet in Glass Vase"}
            price={1200}
            rating={5}
          />

          <Product
            id={14}
            image={
              "https://m.media-amazon.com/images/I/71jjuTLpCpL._AC_SL1500_.jpg"
            }
            title={"JBL Clip 4 - Portable Mini Bluetooth Speaker"}
            price={2500}
            rating={4}
          />

          <Product
            id={15}
            image={
              "https://m.media-amazon.com/images/I/71F+3Yjn6xL._SL1500_.jpg"
            }
            title={"Make up Brushes Pack with 2 Blender Sponge"}
            price={300}
            rating={5}
          />

          <Product
            id={16}
            image={
              "https://m.media-amazon.com/images/I/61h8Dgf8NxL._AC_SL1500_.jpg"
            }
            title={"Sahara Sailor Water Bottles"}
            price={250}
            rating={4}
          />

          <Product
            id={17}
            image={
              "https://m.media-amazon.com/images/I/71VnjUD2tSL._AC_SX679_.jpg"
            }
            title={" Men's 3 Pack Henley Shirts Short Sleeve Casual Basic Tees"}
            price={500}
            rating={5}
          />

          <Product
            id={18}
            image={
              "https://m.media-amazon.com/images/I/71bhqVTk2tL._SL1500_.jpg"
            }
            title={
              "Blue Light Blocking Glasses/Computer/Gaming/TV/Phones Glasses"
            }
            price={800}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
