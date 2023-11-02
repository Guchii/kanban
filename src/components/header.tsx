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
      <Popover>
        <div>
          <h1 style={{ margin: "0" }}>Hello</h1>
          <p style={{ margin: "0" }}>This is a popover</p>
        </div>
      </Popover>
    </header>
  );
}

export default Header;
