/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Tag,
  Button,
  Descriptions,
  InputNumber,
  Select,
  message,
} from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Header } from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Product } from "../api";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const DetailProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const detailProduct = useMemo<Product>(() => location.state, [id]);
  const { addItem } = useCart();
  const [images, setImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const allowOrder = useMemo(
    () => selectedColor && selectedSize && quantity,
    [selectedColor, selectedSize, quantity]
  );

  const handleAddToCart = () => {
    if (!allowOrder) {
      message.error(
        "Vui lòng chọn đầy đủ thông tin trước khi thêm vào giỏ hàng"
      );
      return;
    }

    addItem({
      MaSanPham: detailProduct.MaSanPham,
      TenSanPham: detailProduct.TenSanPham,
      Gia: detailProduct.Gia,
      HinhAnh: detailProduct.HinhAnh.DuongDan,
      MaMau: String(selectedColor),
      MaSize: String(selectedSize),
      SoLuong: String(quantity),
      TenMau: String(
        detailProduct.MauSac?.find((i) => i.MaMauSac === selectedColor)?.MauSac
      ),
      TenSize: String(
        detailProduct.Size?.find((i) => i.MaSize === selectedSize)?.Size
      ),
      PhanTramGiam: detailProduct.PhanTramGiam ?? 0,
    });

    message.success("Thêm thành công sản phẩm vào giỏ hàng");
  };

  useEffect(() => {
    if (!detailProduct) return;

    const formatterImages = detailProduct.HinhAnh.ChiTiet.map(
      (item) => `https://clbtinhocued.me/${item.DuongDan}`
    );

    setImages([
      `https://clbtinhocued.me/${detailProduct.HinhAnh.DuongDan}`,
      ...formatterImages,
    ]);
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
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{
              marginBottom: "20px",
            }}
            onClick={() => navigate(-1)}
          />
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <ImageCarousel images={images} />
            </Col>
            <Col xs={24} md={12}>
              <Title level={2}>{detailProduct.TenSanPham}</Title>
              <Tag color="blue">{detailProduct.TenDanhMuc}</Tag>
              <Descriptions column={1} style={{ marginTop: "16px" }}>
                <Descriptions.Item label="Giá">
                  {Number(detailProduct?.PhanTramGiam) > 0 && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginRight: "8px",
                      }}
                    >
                      {Number(detailProduct.Gia).toLocaleString("vi-VN")} VNĐ
                    </span>
                  )}
                  <span
                    style={{
                      marginRight: "8px",
                      color: "#f69d7a",
                    }}
                  >
                    {detailProduct.GiaSauGiam
                      ? Number(detailProduct.GiaSauGiam).toLocaleString("vi-VN")
                      : Number(detailProduct.Gia).toLocaleString("vi-VN")}
                    VNĐ
                  </span>
                  {Number(detailProduct?.PhanTramGiam) > 0 && (
                    <Tag color="red" style={{ marginLeft: "8px" }}>
                      {Number(detailProduct.PhanTramGiam)}% OFF
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
                <Col span={8}>
                  <Typography.Text strong>Kích cỡ:</Typography.Text>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn kích cỡ"
                    onChange={(value) => setSelectedSize(value)}
                  >
                    {detailProduct?.Size?.map((size) => (
                      <Option key={size.MaSize} value={size.MaSize}>
                        {size.Size}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <Typography.Text strong>Màu:</Typography.Text>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn màu"
                    onChange={(value) => setSelectedColor(value)}
                  >
                    {detailProduct.MauSac?.map((color) => (
                      <Option key={color.MaMauSac} value={color.MaMauSac}>
                        {color.MauSac}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <Typography.Text
                    strong
                    style={{
                      display: "block",
                    }}
                  >
                    Số lượng:
                  </Typography.Text>
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
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
