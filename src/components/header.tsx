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
      }}
    >
      <Popover />
    </header>
  );
}

export default Header;
