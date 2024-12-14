import React from "react";
import { Badge, Layout, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../router/constant";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to={ROUTES.home}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Nhóm 3
        </Title>
      </Link>
      <Badge count={1}>
        <ShoppingCartOutlined
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: "white",
          }}
        />
      </Badge>
    </AntHeader>
  );
};
