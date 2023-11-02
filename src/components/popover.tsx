import useOutsideClick from "@/hooks/use-on-click-outside";
import { PropsWithChildren, memo, useRef, useState } from "react";

const Popover = memo(({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });
  return (
    <div
      style={{
        position: "relative",
      }}
      ref={wrapperRef}
    >
      <button
        style={{
          background: "var(--primary)",
          boxShadow: "2px 4px 4px 0 #00000020",
          transition: "box-shadow 0.1s ease-in-out",
          borderRadius: "2px",
          fontFamily: "inherit",
          cursor: "pointer",
          outline: "0px",
          paddingInline: "16px",
          paddingBlock: "8px",
          border: "2px black solid",
        }}
        onClick={() => setOpen(!open)}
      >
        Details
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            border: "1px solid var(--primary)",
            bottom: "-140px",
            borderRadius: "4px",
            width: "440px",
            boxShadow: "4px 8px 10px 0 #00000040",
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
