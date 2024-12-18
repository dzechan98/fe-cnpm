import { Badge, Layout, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../router/constant";
import { useCart } from "../contexts/CartContext";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {
  const { state } = useCart();

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
      <Link to={ROUTES.cart}>
        <Badge count={state.items.length}>
          <ShoppingCartOutlined
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: "white",
            }}
          />
        </Badge>
      </Link>
    </AntHeader>
  );
};
