/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .slick-dots {
    bottom: 16px;

    li button {
      background: #fff;
      opacity: 0.4;
    }

    li.slick-active button {
      background: #fff;
      opacity: 1;
    }
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const CarouselButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

const Thumbnail = styled.img<{ isActive: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isActive ? "#1890ff" : "transparent")};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #40a9ff;
  }
`;

const images = [
  "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
  "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
];

const ImageCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = React.useRef<any>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.goTo(index);
    setCurrentSlide(index);
  };

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
  };

  return (
    <div>
      <CarouselWrapper>
        <Carousel
          ref={carouselRef}
          autoplay
          effect="fade"
          dots={false}
          afterChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <div key={index}>
              <CarouselImage src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
        <CarouselButton
          className="prev"
          icon={<LeftOutlined />}
          shape="circle"
          onClick={handlePrev}
          aria-label="Previous slide"
        />
        <CarouselButton
          className="next"
          icon={<RightOutlined />}
          shape="circle"
          onClick={handleNext}
          aria-label="Next slide"
        />
      </CarouselWrapper>
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            isActive={currentSlide === index}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </ThumbnailContainer>
    </div>
  );
};

export default ImageCarousel;
