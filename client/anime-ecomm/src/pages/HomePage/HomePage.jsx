import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Carousel
import Carousel from "react-bootstrap/Carousel";

import "./HomePage.css";

const HomePage = () => {
  return (
    <Container className="homepage-container">
      <Row className="hero-section">
        {/* need to figure out why image is not targeting width  */}
        <Col className="hero-carousel">
          {/* include a carousel of images?  */}
          <Carousel>
            <Carousel.Item>
              <img
                className="carouselPicture"
                src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselPicture"
                src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
              />
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
        {/* include pictures of the 4 categories  */}
        <Col>
          Collectables
          <img
            className="homeCategory"
            src="https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw8d3a98e5/images/4535123840678_lelouch-of-the-rebellion-code-geass-lelouch-lamperouge-gem-series-figure-gem15th-anniversary-ver_1.jpg"
          />
        </Col>
        <Col>
          Clothing
          <img
            className="homeCategory"
            src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          Home Entertainment
          <img
            className="homeCategory"
            src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
          />
        </Col>
        <Col>
          Manga & Books
          <img
            className="homeCategory"
            src="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
