import { Button, Card, Flex, List, Pagination, Tag, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Text } = Typography;

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  sold: number;
  stock: number;
  price: number;
}

interface ListProductProps {
  products: Product[];
}

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 12px;
  }
`;

export const ListProduct: React.FC<ListProductProps> = ({ products }) => {
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
                  alt={item.name}
                  src={item.image}
                  height={180}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`products/${item.id}`)}
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
                    <Text className="clamp-text">{item.name}</Text>
                    <Flex gap={8} align="center">
                      <Text
                        style={{
                          color: "#f69d7a",
                        }}
                      >
                        đ{item.price.toFixed(2)}
                      </Text>
                      <Tag
                        color="error"
                        style={{
                          height: "16px",
                          fontSize: "10px",
                          margin: 0,
                          width: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        -50%
                      </Tag>
                    </Flex>
                    <Text
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Đã bán {item.sold}
                    </Text>
                  </Flex>
                }
              />
            </StyledCard>
          </List.Item>
        )}
      />
      <Pagination align="center" defaultCurrent={1} total={50} />
    </>
  );
};
