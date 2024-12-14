import React from "react";
import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Nhóm 3
      </Title>
    </AntHeader>
  );
};
