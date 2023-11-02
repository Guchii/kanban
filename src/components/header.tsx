import Popover from "./popover";

function Header() {
  return (
    <header
      style={{
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "var(--primary)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.01)",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Popover />
    </header>
  );
}

export default Header;
