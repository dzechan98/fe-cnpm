import React, { useState } from "react";
import { Layout, Menu, List, Card, Row, Col, Input } from "antd";
import { ShoppingOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "./Header";

const { Content, Sider } = Layout;

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports & Outdoors",
];

const products = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 599.99 },
  { id: 2, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 3, name: "T-shirt", category: "Clothing", price: 19.99 },
  { id: 4, name: "Jeans", category: "Clothing", price: 49.99 },
  { id: 5, name: "Novel", category: "Books", price: 14.99 },
  { id: 6, name: "Cookbook", category: "Books", price: 24.99 },
  { id: 7, name: "Garden Tools Set", category: "Home & Garden", price: 79.99 },
  { id: 8, name: "Yoga Mat", category: "Sports & Outdoors", price: 29.99 },
];

const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            style={{ height: "100%", borderRight: 0 }}
            onSelect={({ key }) => setSelectedCategory(key as string)}
          >
            <Menu.Item key={null} onClick={() => setSelectedCategory(null)}>
              Tất cả danh mục
            </Menu.Item>
            {categories.map((category) => (
              <Menu.Item key={category} icon={<ShoppingOutlined />}>
                {category}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Input
                  placeholder="Search products"
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              dataSource={filteredProducts}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.name}
                    extra={<a href="#">Details</a>}
                    style={{ width: "100%" }}
                  >
                    <p>Category: {item.category}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductCatalog;
