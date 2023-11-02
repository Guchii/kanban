import Popover from "./popover";

function Header() {
  return (
    <header
      style={{
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        background: "var(--primary)",
      }}
    >
      <Popover />
    </header>
  );
}

export default Header;
