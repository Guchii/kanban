import { PropsWithChildren, memo, useState } from "react";

const Popover = memo(({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button onClick={() => setOpen(!open)}>Details</button>,
      {open ? (
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            borderRadius: "4px",
            border: "1px solid var(--primary)",
            width: "240px",
            height: "100px",
            left: "0",
            background: "var(--primary)",
            padding: "16px",
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
});

export default Popover;
