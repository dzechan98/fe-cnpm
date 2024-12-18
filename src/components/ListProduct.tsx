/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Flex, List, Pagination, Tag, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../api";

const { Text } = Typography;

interface ListProductProps {
  products: Product[];
  page: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const StyledCard = styled(Card)<{ outOfStock?: boolean }>`
  overflow: hidden;
  .ant-card-body {
    padding: 12px;
  }
  ${(props) =>
    props.outOfStock &&
    `
    opacity: 0.7;
    filter: grayscale(50%);
  `}
`;

const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ListProduct: React.FC<ListProductProps> = ({
  products,
  page,
  setPage,
  total,
}) => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    if (Number(product.SoLuongConLai) > 0) {
      navigate(`products/${product.MaSanPham}`, { state: product });
    }
  };

  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={products}
        renderItem={(item) => {
          const outOfStock = Number(item.SoLuongConLai) === 0;
          return (
            <List.Item>
              <StyledCard
                outOfStock={outOfStock}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={item.TenSanPham}
                      src={`https://clbtinhocued.me/${item.HinhAnh.DuongDan}`}
                      height={180}
                      style={{
                        cursor: outOfStock ? "not-allowed" : "pointer",
                      }}
                      onClick={() => handleProductClick(item)}
                    />
                    {outOfStock && (
                      <OutOfStockOverlay>
                        <Tag color="error">Hết hàng</Tag>
                      </OutOfStockOverlay>
                    )}
                  </div>
                }
              >
                <Card.Meta
                  description={
                    <Flex vertical>
                      <Text className="clamp-text">{item.TenSanPham}</Text>
                      <Flex gap={8} align="center">
                        {Number(item.PhanTramGiam) > 0 && (
                          <Text
                            delete
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            {Number(item.Gia).toLocaleString("vi-VN")} VNĐ
                          </Text>
                        )}
                        <Text
                          style={{
                            color: "#f69d7a",
                          }}
                        >
                          {item.GiaSauGiam
                            ? Number(item.GiaSauGiam).toLocaleString("vi-VN")
                            : Number(item.Gia).toLocaleString("vi-VN")}
                          VNĐ
                        </Text>
                        {Number(item.PhanTramGiam) > 0 && (
                          <Tag
                            color="error"
                            style={{
                              height: "16px",
                              fontSize: "10px",
                              margin: 0,
                              width: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {`${Number(item.PhanTramGiam)}%`}
                          </Tag>
                        )}
                      </Flex>
                      <Text
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Đã bán {item.DaBan}
                      </Text>
                      {!outOfStock && (
                        <Text
                          style={{
                            fontSize: "12px",
                            color:
                              Number(item.SoLuongConLai) < 10
                                ? "orange"
                                : "inherit",
                          }}
                        >
                          Còn lại: {item.SoLuongConLai}
                        </Text>
                      )}
                    </Flex>
                  }
                />
              </StyledCard>
            </List.Item>
          );
        }}
      />
      <Pagination
        align="center"
        defaultCurrent={page}
        pageSize={8}
        total={total}
        onChange={(p, _) => setPage(p)}
      />
    </>
  );
};
