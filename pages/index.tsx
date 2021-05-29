import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer/Footer";
import GhostButton from "../components/Buttons/GhostButton";
import Button from "../components/Buttons/Button";
import TextButton from "../components/Buttons/TextButton";
import Input from "../components/Input/Input";
import Slideshow from "../components/HeroSection/Slideshow";
import Image from "next/image";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import Card from "../components/Card/Card";
import Card3 from "../components/Card/Card3";
import Card5 from "../components/Card/Card5";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import { default as featuredItems } from "../components/Util/Items";
import { useState, useContext } from "react";
import CartContext from "../context/CartContext";
import { db } from "./../firebase/firebase";
import firebase from "../firebase/firebase";

export default function Home({ products }) {
  const [totalItems, setTotalItems] = useState(10);
  const { addOne } = useContext(CartContext);

  const currentItems = products.slice(0, totalItems);

  // let arrItems = [];

  // for (let i = 1; i <= totalItems; i++) {
  //   arrItems = [...arrItems, i];
  // }

  return (
    <div className="">
      <Header />
      {/* <HeroSection /> */}
      <Slideshow />
      <section className="w-full h-auto px-2 sm:px-8 md:px-16 py-10 border border-b-2 border-gray100">
        <div className="h-full flex flex-col md:flex-row">
          <div className="h-full w-full md:w-1/3 lg:w-1/2 p-4">
            <OverlayContainer
              imgSrc="/bg-img/banner_minipage1.jpg"
              imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
            >
              <GhostButton
                value="New Arrivals"
                size="xl"
                inverted
                noBorder
                extraClass="absolute bottom-10-per sm:right-10-per z-20"
              />
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage2.jpg">
              <GhostButton
                value="Women Collection"
                size="lg"
                inverted
                noBorder
                extraClass="absolute bottom-10-per z-20"
              />
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage3.jpg">
              <GhostButton
                value="Men Collection"
                size="lg"
                inverted
                noBorder
                extraClass="absolute bottom-10-per z-20"
              />
            </OverlayContainer>
          </div>
        </div>
      </section>
      <section className="w-full h-full flex flex-col justify-center items-center mt-16 mb-20">
        <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8">
          <h4 className="text-3xl mb-4">Best Selling</h4>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugit
            aliquam hic, voluptatibus iste consectetur odit
          </span>
        </div>
        <div className="flex flex-col md:flex-row w-full px-6 sm:px-16 md:px-20">
          <Card3
            imgSrc1="/bg-img/woman-hoodie-1.jpg"
            imgSrc2="/bg-img/women-shortpatch-a1.jpg"
            itemName="Shortpatch"
            itemPrice={200.0}
          />
          <Card3
            imgSrc1="/bg-img/women-relaxedshirt-a2.jpg"
            imgSrc2="/bg-img/woman-hoodie-1.jpg"
            itemName="Relaxed Shirt"
            itemPrice={130.0}
          />
          <Card3
            imgSrc1="/bg-img/women-shortpatch-a1.jpg"
            imgSrc2="/bg-img/woman-hoodie-1.jpg"
            itemName="HodieS"
            itemPrice={230.0}
          />
        </div>
      </section>
      <section className="w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen">
        <h4 className="text-3xl">Testimonial</h4>
        <TestiSlider />
      </section>

      <section className="px-2 sm:px-8 md:px-16 my-16 flex flex-col items-center">
        <div className="text-center mb-6">
          <h4 className="text-3xl">Featured Products</h4>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap w-full mb-8">
          {currentItems.map((item) => (
            <Card5
              key={item.id}
              imgSrc1={item.img1}
              imgSrc2={item.img2}
              itemName={item.name}
              itemPrice={item.price}
              onClick={() => addOne(item)}
              itemLink={`/products/${encodeURIComponent(item.id)}`}
            />
          ))}
        </div>
        <span
          className="cursor-pointer"
          onClick={() => setTotalItems((prevState) => prevState * 2)}
        >
          <Button value="See More" />
        </span>
      </section>

      <div className="border-gray100 border-b-2"></div>

      <section className="mt-16 mb-20 flex flex-col justify-center items-center text-center">
        <div className="textBox w-2/5 mb-6">
          <h4 className="text-3xl mb-6">Our Shop</h4>
          <span>
            Stop by our stores to learn the stories behind our products, get a
            personal styling session, or shop the latest in person. See our
            store locations.
          </span>
        </div>
        <div className="w-full px-20 flex justify-center">
          <img className="w-full" src="/bg-img/ourshop.png" alt="Our Shop" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  let products = [];
  const res = await db.collection("products").get();
  res.forEach((doc) => {
    // console.log(doc.data().id);
    let docData = doc.data();
    products = [
      ...products,
      {
        id: docData.id,
        name: docData.name,
        price: docData.price,
        img1: docData.img1,
        img2: docData.img2,
      },
    ];
  });
  // console.log(products);
  // db.collection("products")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data().id);
  //       let docData = doc.data();
  //       products = [
  //         ...products,
  //         {
  //           id: docData.id,
  //           name: docData.name,
  //           price: docData.price,
  //           img1: docData.img1,
  //           img2: docData.img2,
  //         },
  //       ];
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error getting doc: ", error);
  //   });
  return {
    props: { products }, // will be passed to the page component as props
  };
};
