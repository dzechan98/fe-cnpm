/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Flex, List, Pagination, Tag, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Text } = Typography;

export interface Product {
  MaSanPham: string;
  TenSanPham: string;
  HinhAnh: string;
  Gia: string;
  SoLuong: string;
  PhanTramGiam: string;
  DaBan: string;
  TenDanhMuc: string;
}

interface ListProductProps {
  products: Product[];
  page: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 12px;
  }
`;

export const ListProduct: React.FC<ListProductProps> = ({
  products,
  page,
  setPage,
  total,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <StyledCard
              cover={
                <img
                  alt={item.TenSanPham}
                  src={item.HinhAnh}
                  height={180}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`products/${item.MaSanPham}`)}
                />
              }
              actions={[
                <Flex
                  justify="space-between"
                  style={{
                    padding: "0 12px",
                  }}
                >
                  <Button size="small" danger>
                    Thêm vào giỏ hàng
                  </Button>
                  <Button type="primary" size="small">
                    Đặt hàng
                  </Button>
                </Flex>,
              ]}
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
                          {Number(item.Gia)} VNĐ
                        </Text>
                      )}
                      <Text
                        style={{
                          color: "#f69d7a",
                        }}
                      >
                        {Number(item.Gia) -
                          (Number(item.Gia) * Number(item.PhanTramGiam)) /
                            100}{" "}
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
                  </Flex>
                }
              />
            </StyledCard>
          </List.Item>
        )}
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
