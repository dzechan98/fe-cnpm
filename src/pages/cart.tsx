import React, { useState } from "react";
import {
  List,
  Card,
  Button,
  InputNumber,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  Breadcrumb,
  Flex,
} from "antd";
import {
  DeleteOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Header } from "../components/Header";

const { Title, Text } = Typography;

interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    color: "Trắng",
    size: "XL",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 2,
    name: "Smartphone",
    color: "Trắng",
    size: "XL",
    price: 599.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    name: "Laptop",
    color: "Trắng",
    size: "XL",
    price: 999.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
];

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    console.log("Continue shopping clicked");
    // Implement navigation to product listing or home page
  };

  const handleProceedToCheckout = () => {
    console.log("Proceed to checkout clicked");
    // Implement checkout process
  };

  return (
    <>
      <Header />

      <div style={{ padding: "20px" }}>
        <Breadcrumb
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: "Giỏ hàng",
            },
          ]}
        />
        <Title level={2}>Giỏ hàng</Title>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: "100%" }}>
                <Row gutter={16} align="middle">
                  <Col span={4}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={8}>
                    <Flex vertical>
                      <Text strong>{item.name}</Text>
                      <Text>{item.size}</Text>
                      <Text>{item.color}</Text>
                    </Flex>
                  </Col>
                  <Col span={4}>
                    <Text>{item.price.toFixed(2)} VNĐ</Text>
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) =>
                        updateQuantity(item.id, value as number)
                      }
                    />
                  </Col>
                  <Col span={3}>
                    <Text strong>
                      {(item.price * item.quantity).toFixed(2)} VNĐ
                    </Text>
                  </Col>
                  <Col span={1}>
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <Divider />
        <Row justify="end">
          <Col>
            <Title level={3}>
              Tổng giá: {calculateSubtotal().toFixed(2)}VNĐ
            </Title>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: "24px" }}>
          <Space size="large">
            <Button
              icon={<ShoppingOutlined />}
              onClick={handleContinueShopping}
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={handleProceedToCheckout}
            >
              Đặt hàng
            </Button>
          </Space>
        </Row>
      </div>
    </>
  );
};
