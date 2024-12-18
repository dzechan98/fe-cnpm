/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Table,
  Card,
  Button,
  InputNumber,
  Typography,
  Space,
  Layout,
  Tag,
  Empty,
  Image,
  message,
} from "antd";
import {
  DeleteOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Header } from "../components/Header";
import { CartItem, useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/constant";
import { createOrder, OrderPayload } from "../api";

const { Title, Text } = Typography;
const { Content } = Layout;

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateItemQuantity, clearCart } = useCart();

  const calculateSubtotal = (): number =>
    state.items.reduce(
      (total, item) =>
        total +
        parseFloat(item.Gia) *
          (1 - parseFloat(item.PhanTramGiam) / 100) *
          parseInt(item.SoLuong),
      0
    );

  const handleContinueShopping = () => {
    navigate(ROUTES.home);
  };

  const handleProceedToCheckout = async () => {
    const payload: OrderPayload = {
      items: state.items.map((product) => ({
        MaSanPham: product.MaSanPham,
        MaSize: product.MaSize,
        SoLuong: Number(product.SoLuong),
        MaMauSac: product.MaMau,
      })),
    };
    try {
      await createOrder(payload);
      message.success("Đặt hàng thành công");
      clearCart();
    } catch (error) {
      console.log(error);
      message.error("Đặt hàng thất bại do số lượng sản phẩm không đủ");
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "TenSanPham",
      key: "TenSanPham",
      render: (text: string, record: CartItem) => (
        <Space>
          <Image
            width={80}
            height={80}
            src={`https://clbtinhocued.me/${record.HinhAnh}`}
            alt={text}
            style={{ objectFit: "cover" }}
          />
          <Space direction="vertical" size="small">
            <Text strong>{text}</Text>
            <Space>
              <Tag color="blue">{record.TenSize}</Tag>
              <Tag color="green">{record.TenMau}</Tag>
            </Space>
          </Space>
        </Space>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "Gia",
      key: "Gia",
      render: (text: string, record: CartItem) => (
        <Space direction="vertical" size="small">
          <Text type="secondary" delete style={{ fontSize: "12px" }}>
            {parseFloat(text).toLocaleString("vi-VN")} VNĐ
          </Text>
          <Text type="danger" strong>
            {(
              parseFloat(text) *
              (1 - parseFloat(record.PhanTramGiam) / 100)
            ).toLocaleString("vi-VN")}{" "}
            VNĐ
          </Text>
          <Text type="warning" style={{ fontSize: "12px" }}>
            Giảm {parseFloat(record.PhanTramGiam).toLocaleString()}%
          </Text>
        </Space>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
      render: (text: string, record: CartItem) => (
        <InputNumber
          min={1}
          value={parseInt(text)}
          onChange={(value) =>
            updateItemQuantity(record, value?.toString() || "1")
          }
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "ThanhTien",
      render: (_text: string, record: CartItem) => (
        <Text strong>
          {(
            parseFloat(record.Gia) *
            (1 - parseFloat(record.PhanTramGiam) / 100) *
            parseInt(record.SoLuong)
          ).toLocaleString("vi-VN")}{" "}
          VNĐ
        </Text>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_text: string, record: CartItem) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header />
      <Content className="px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-md">
          <Title level={2} className="mb-6">
            <ShoppingCartOutlined className="mr-2" /> Giỏ hàng của bạn
          </Title>
          {state.items.length === 0 ? (
            <Empty
              description="Giỏ hàng của bạn đang trống"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                onClick={handleContinueShopping}
              >
                Tiếp tục mua sắm
              </Button>
            </Empty>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={state.items}
                pagination={false}
                rowKey="MaSanPham"
              />
              <div
                style={{
                  marginTop: 24,
                  textAlign: "right",
                }}
              >
                <Title level={3}>
                  Tổng cộng: {calculateSubtotal().toLocaleString("vi-VN")} VNĐ
                </Title>
              </div>
              <div
                style={{
                  marginTop: 24,
                  textAlign: "right",
                }}
              >
                <Space size="large">
                  <Button
                    icon={<ShoppingOutlined />}
                    onClick={handleContinueShopping}
                    size="large"
                  >
                    Tiếp tục mua sắm
                  </Button>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleProceedToCheckout}
                    size="large"
                  >
                    Tiến hành đặt hàng
                  </Button>
                </Space>
              </div>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};
