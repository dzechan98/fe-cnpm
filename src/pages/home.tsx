import { useEffect, useState } from "react";
import { Layout, Menu, Row, Col, Input } from "antd";
import { ShoppingOutlined, SearchOutlined } from "@ant-design/icons";
import { Header } from "../components/Header";
import { ListProduct } from "../components/ListProduct";
import {
  Category,
  getListCategory,
  getListProduct,
  ListResponseProduct,
} from "../api";

const { Content, Sider } = Layout;

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const [selected, setSelected] = useState("");

  const [products, setProducts] = useState<ListResponseProduct>(
    {} as ListResponseProduct
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListProduct(page, selected, searchTerm);
        setProducts(response);
      } catch (err) {
        setProducts({} as ListResponseProduct);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [page, selected, searchTerm]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getListCategory();
        setCategories(response);
      } catch (err) {
        setCategories([]);
        console.error("Error fetching products:", err);
      }
    };

    fetchCategories();
  }, []);

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
            <Menu.Item
              key={"all"}
              onClick={() => {
                setSelectedCategory("all");
                setSelected("");
                setPage(1);
              }}
            >
              Tất cả danh mục
            </Menu.Item>
            {categories.map((category) => (
              <Menu.Item
                key={category.MaDanhMuc}
                icon={<ShoppingOutlined />}
                onClick={() => {
                  setSelected(category.TenDanhMuc);
                  setPage(1);
                }}
              >
                {category.TenDanhMuc}
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
            <ListProduct
              products={products.products}
              page={page}
              setPage={setPage}
              total={Number(products.total_pages) * 8}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
