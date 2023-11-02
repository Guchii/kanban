import { useAppContext } from "@/hooks/use-context";
import Popover from "./popover";

function Header() {
  const data = useAppContext();
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
        <div>{JSON.stringify(data)}</div>
      </Popover>
    </header>
  );
}

export default Header;
