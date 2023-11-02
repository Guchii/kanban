import { HeartIcon } from "lucide-react";
import Popover from "./popover";

function Header() {
  return (
    <header
      style={{
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--primary)",
        padding: 32,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.01)",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Popover />
      <a
        href="https://github.com/guchii"
        target="_blank"
        style={{
          display: "flex",
          gap: 8,
          textDecoration: "none",
          alignItems: "center",
          color: "crimson",
        }}
      >
        Shivom Srivastava
        <HeartIcon width={12} />
      </a>
    </header>
  );
}

export default Header;
