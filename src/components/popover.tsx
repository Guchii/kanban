import { useAppContext } from "@/hooks/use-context";
import useOutsideClick from "@/hooks/use-on-click-outside";
import { memo, useRef, useState } from "react";

const Popover = memo(() => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useAppContext();
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
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "16px",
            }}
          >
            <label htmlFor="grouping">Grouping</label>
            <select
              value={filter.grouping}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  grouping: e.currentTarget.value as
                    | "user"
                    | "status"
                    | "priority",
                });
                setOpen(false);
              }}
            >
              <option value="user">user</option>
              <option value="status">status</option>
              <option value="priority">priority</option>
            </select>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "16px",
            }}
          >
            <label htmlFor="sorting">Sorting</label>
            <select
              value={filter.sorting}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  sorting: e.currentTarget.value as "title" | "priority",
                });
                setOpen(false);
              }}
            >
              <option value="title">title</option>
              <option value="priority">priority</option>
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default Popover;
