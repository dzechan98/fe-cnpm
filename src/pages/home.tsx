import { useEffect, useState } from "react";
import { Layout, Menu, Row, Col, Input } from "antd";
import { ShoppingOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components/Header";
import { ListProduct, Product } from "../components/ListProduct";

const { Content, Sider } = Layout;

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports & Outdoors",
];

const products: Product[] = [
  {
    id: 1,
    name: "Ốp điện thoại IPhone sạc không dây từ tính đơn giản Tương thích .clamp-text .clamp-text .clamp-text .clamp-text .clamp-text ",
    category: "Electronics",
    price: 599.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 120,
    stock: 50,
  },
  {
    id: 2,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 80,
    stock: 30,
  },
  {
    id: 3,
    name: "T-shirt",
    category: "Clothing",
    price: 19.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 200,
    stock: 100,
  },
  {
    id: 4,
    name: "Jeans",
    category: "Clothing",
    price: 49.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 150,
    stock: 75,
  },
  {
    id: 5,
    name: "Novel",
    category: "Books",
    price: 14.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 300,
    stock: 200,
  },
  {
    id: 6,
    name: "Cookbook",
    category: "Books",
    price: 24.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 100,
    stock: 50,
  },
  {
    id: 7,
    name: "Garden Tools Set",
    category: "Home & Garden",
    price: 79.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 50,
    stock: 25,
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "Sports & Outdoors",
    price: 29.99,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rblx-lnwul7heor2dd6@resize_w900_nl.webp",
    sold: 180,
    stock: 90,
  },
];
export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          (selectedCategory === "all" ||
            product.category === selectedCategory) &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [selectedCategory, searchTerm]);

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
            <Menu.Item key={"all"} onClick={() => setSelectedCategory("all")}>
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
            <Row
              gutter={[16, 16]}
              style={{
                marginBottom: 12,
              }}
            >
              <Col span={24}>
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  size="large"
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
            <ListProduct products={filteredProducts} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
