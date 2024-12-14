import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Tag,
  Button,
  Descriptions,
  InputNumber,
  Select,
  Breadcrumb,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Header } from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const product = {
  id: 1,
  title: "Premium Wireless Headphones",
  image:
    "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
  category: "Electronics",
  sold: 1234,
  inStock: 50,
  sizes: ["Small", "Medium", "Large"],
  colors: ["Black", "White", "Blue", "Red"],
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life, these headphones are perfect for music enthusiasts and professionals alike.",
  price: 199.99,
  discountPercentage: 15,
};

export const DetailProduct: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleOrder = () => {
    console.log("Ordered:", {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <Breadcrumb
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
              {
                href: "",
                title: "Category",
              },
              {
                title: "Application",
              },
            ]}
          />
        </div>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <ImageCarousel />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{product.title}</Title>
            <Tag color="blue">{product.category}</Tag>
            <Descriptions column={1} style={{ marginTop: "16px" }}>
              <Descriptions.Item label="Giá">
                <span
                  style={{ textDecoration: "line-through", marginRight: "8px" }}
                >
                  ${product.price.toFixed(2)}
                </span>
                <span
                  style={{
                    color: "#f50",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  ${discountedPrice.toFixed(2)}
                </span>
                <Tag color="red" style={{ marginLeft: "8px" }}>
                  {product.discountPercentage}% OFF
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đã bán">
                {product.sold}
              </Descriptions.Item>
              <Descriptions.Item label="Có sẵn">
                {product.inStock}
              </Descriptions.Item>
            </Descriptions>
            <Paragraph style={{ marginTop: "16px" }}>
              {product.description}
            </Paragraph>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Typography.Text strong>Size:</Typography.Text>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Size"
                  onChange={(value) => setSelectedSize(value)}
                >
                  {product.sizes.map((size) => (
                    <Option key={size} value={size}>
                      {size}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Typography.Text strong>Màu:</Typography.Text>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Color"
                  onChange={(value) => setSelectedColor(value)}
                >
                  {product.colors.map((color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row
              align="middle"
              style={{ marginTop: "16px", marginBottom: "16px" }}
            >
              <Col span={8}>
                <Typography.Text strong>Số lượng:</Typography.Text>
              </Col>
              <Col span={16}>
                <InputNumber
                  min={1}
                  max={product.inStock}
                  value={quantity}
                  onChange={(value) => setQuantity(value as number)}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "24px" }}>
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  block
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<ThunderboltOutlined />}
                  size="large"
                  block
                  danger
                  onClick={handleOrder}
                >
                  Đặt hàng ngay
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
