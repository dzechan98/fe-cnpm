/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { DetailProduct as DetailProductType, getDetailProduct } from "../api";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const DetailProduct: React.FC = () => {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState<DetailProductType | null>(
    null
  );
  const [images, setImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const discountedPrice = 10;

  const handleAddToCart = () => {
    if (!detailProduct) return;

    console.log("Added to cart:", {
      productId: detailProduct.MaSanPham,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleOrder = () => {
    if (!detailProduct) return;
    console.log("Ordered:", {
      productId: detailProduct.MaSanPham,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await getDetailProduct(String(id));
        setDetailProduct(response);
      } catch (error) {
        setDetailProduct({} as DetailProductType);
      }
    };
    fetchDetailProduct();
  }, [id]);

  useEffect(() => {
    if (!detailProduct) return;

    const formatterImages = detailProduct.HinhAnh.ChiTiet.map(
      (item) => `https://clbtinhocued.me/${item.DuongDan}`
    );

    setImages([detailProduct.HinhAnh.DuongDan, ...formatterImages]);
  }, [detailProduct]);

  return (
    <>
      <Header />
      {detailProduct && (
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
                  title: detailProduct.TenDanhMuc,
                },
                {
                  title: "Application",
                },
              ]}
            />
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <ImageCarousel images={images} />
            </Col>
            <Col xs={24} md={12}>
              <Title level={2}>{detailProduct.TenSanPham}</Title>
              <Tag color="blue">{detailProduct.TenDanhMuc}</Tag>
              <Descriptions column={1} style={{ marginTop: "16px" }}>
                <Descriptions.Item label="Giá">
                  {Number(detailProduct.PhanTramGiam) > 0 && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginRight: "8px",
                      }}
                    >
                      {detailProduct.Gia} VNĐ
                    </span>
                  )}
                  <span
                    style={{
                      marginRight: "8px",
                      color: "#f69d7a",
                    }}
                  >
                    {Number(detailProduct.Gia) -
                      (Number(detailProduct.Gia) *
                        Number(detailProduct.PhanTramGiam ?? 0)) /
                        100}{" "}
                    VNĐ
                  </span>
                  {Number(detailProduct.PhanTramGiam) > 0 && (
                    <Tag color="red" style={{ marginLeft: "8px" }}>
                      {discountedPrice}% OFF
                    </Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Đã bán">
                  {detailProduct.DaBan}
                </Descriptions.Item>
                <Descriptions.Item label="Có sẵn">
                  {detailProduct.SoLuongConLai}
                </Descriptions.Item>
              </Descriptions>
              <Paragraph style={{ marginTop: "16px" }}>
                {detailProduct.MoTa}
              </Paragraph>
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col span={12}>
                  <Typography.Text strong>Size:</Typography.Text>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Size"
                    onChange={(value) => setSelectedSize(value)}
                  >
                    {detailProduct?.Size.map((size) => (
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
                    {detailProduct.MauSac.map((color) => (
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
                    max={Number(detailProduct.SoLuongConLai)}
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
      )}
    </>
  );
};
