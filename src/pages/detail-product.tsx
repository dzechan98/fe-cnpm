import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Image,
  Tag,
  Button,
  Descriptions,
  List,
  Card,
  InputNumber,
} from "antd";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Header } from "../components/Header";

const { Title, Paragraph } = Typography;

const product = {
  id: 1,
  title: "Premium Wireless Headphones",
  image:
    "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
  category: "Electronics",
  sold: 1234,
  inStock: 50,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life, these headphones are perfect for music enthusiasts and professionals alike.",
  price: 199.99,
  discountPercentage: 15,
  relatedProducts: [
    {
      id: 2,
      title: "Wireless Earbuds",
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
      price: 89.99,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
      price: 129.99,
    },
    {
      id: 4,
      title: "Noise-Cancelling Headphones",
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6_tn.webp",
      price: 249.99,
    },
  ],
};

export const DetailProduct: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    console.log("Added to cart:", product.id);
  };

  const handleOrder = () => {
    console.log("Ordered:", product.id);
  };

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
        }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Image src={product.image} alt={product.title} width="100%" />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{product.title}</Title>
            <Tag color="blue">{product.category}</Tag>
            <Descriptions column={1} style={{ marginTop: "16px" }}>
              <Descriptions.Item label="Price">
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
              <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
              <Descriptions.Item label="In Stock">
                {product.inStock}
              </Descriptions.Item>
            </Descriptions>
            <Paragraph style={{ marginTop: "16px" }}>
              {product.description}
            </Paragraph>
            <Row
              align="middle"
              style={{ marginTop: "16px", marginBottom: "16px" }}
            >
              <Col span={8}>
                <Typography.Text strong>Quantity:</Typography.Text>
              </Col>
              <Col span={16}>
                <InputNumber
                  min={1}
                  max={product.inStock}
                  value={quantity}
                  onChange={(value) => setQuantity(Number(value))}
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
        <div style={{ marginTop: "48px" }}>
          <Title level={3}>Related Products</Title>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={product.relatedProducts}
            renderItem={(item) => (
              <List.Item>
                <Card
                  cover={<img alt={item.title} src={item.image} />}
                  hoverable
                >
                  <Card.Meta
                    title={item.title}
                    description={
                      <span style={{ color: "#f50" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};
