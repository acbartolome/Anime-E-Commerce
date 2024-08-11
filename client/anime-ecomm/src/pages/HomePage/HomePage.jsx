import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logoOne from "../../assets/CR Store Slider - Desktop 2000 x 500 - SALE ANNOUNCEMENT - NONSUBS - 8_5.jpg";
import logoTwo from "../../assets/US_2024 07_CRxLogicxCowboy Bebop WK1 + WK2_CR Store Assets-Store_Slide-Dtop-Product_Lay.jpg";
import { useNavigate } from "react-router-dom";
// Carousel
import Carousel from "react-bootstrap/Carousel";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container className="homepage-container">
      <Row className="hero-section">
        {/* need to figure out why image is not targeting width  */}
        <Col className="hero-carousel">
          {/* include a carousel of images?  */}
          <Carousel>
            <Carousel.Item>
              <img className="carouselPicture" src={logoOne} />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="carouselPicture" src={logoTwo} />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselPicture"
                src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        {/* <Col>Popular Items</Col> */}
      </Row>
      <Row>
        <h1>EXPLORE OUR AMAZING SELECTION OF ANIME</h1>
      </Row>
      <Row>
        {/* include pictures of the 4 categories  */}
        <Col>
          <p
            onClick={() =>
              navigate("/collections/shop-all?category=collectables")
            }
          >
            Collectables
          </p>
          <img
            onClick={() =>
              navigate("/collections/shop-all?category=collectables")
            }
            className="homeCategory"
            src="https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw8d3a98e5/images/4535123840678_lelouch-of-the-rebellion-code-geass-lelouch-lamperouge-gem-series-figure-gem15th-anniversary-ver_1.jpg"
          />
        </Col>
        <Col>
          <p
            onClick={() => navigate("/collections/shop-all?category=clothing")}
          >
            Clothing
          </p>
          <img
            onClick={() => navigate("/collections/shop-all?category=clothing")}
            className="homeCategory"
            src="https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw0d6c04fd/images/BHAS2678_bleach-ichigo-soul-reaper-ss-t-shirt_5.jpg"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            onClick={() =>
              navigate("/collections/shop-all?category=home-entertainment")
            }
          >
            Home Entertainment
          </p>
          <img
            onClick={() =>
              navigate("/collections/shop-all?category=home-entertainment")
            }
            className="homeCategory"
            src="https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw49c583aa/rightstuf/704400107368_anime-attack-on-titan-the-final-season-part-2-limited-edition-blu-ray-dvd-primary.jpg"
          />
        </Col>
        <Col>
          <p
            onClick={() =>
              navigate("/collections/shop-all?category=manga-books")
            }
          >
            Manga & Books
          </p>
          <img
            onClick={() =>
              navigate("/collections/shop-all?category=manga-books")
            }
            className="homeCategory"
            src="https://cdn10.bigcommerce.com/s-g9n04qy/products/814590/images/837237/61GpjyHb9VL._SL1350___47754.1687810750.500.500.jpg?c=2"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
