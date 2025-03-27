import Link from "next/link";
import { Menu } from "antd";

export default function Navbar() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/cart">Cart</Link>
      </Menu.Item>
    </Menu>
  );
}
