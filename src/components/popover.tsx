import { useAppContext } from "@/hooks/use-context";
import useOutsideClick from "@/hooks/use-on-click-outside";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { memo, useRef, useState } from "react";

const Popover = memo(() => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useAppContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });
  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      <button
        style={{
          background: "var(--primary)",
          color: "black",
          boxShadow: "2px 4px 4px 0 #00000020",
          transition: "box-shadow 0.1s ease-in-out",
          borderRadius: 4,
          fontFamily: "inherit",
          cursor: "pointer",
          outline: "0px",
          paddingInline: "16px",
          paddingBlock: "8px",
          border: "1px gray solid",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal size={12} />
        Details
        <ChevronDown style={{ marginInlineStart: "auto" }} size={16} />
      </button>
      {open ? (
        <div
          style={{
            padding: 16,
            position: "absolute",
            border: "1px solid var(--primary)",
            bottom: -80,
            borderRadius: "4px",
            width: 200,
            boxShadow: "4px 4px 10px 0 #00000010",
            height: 80,
            left: 0,
            zIndex: 10000000,
            background: "var(--primary)",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "16px",
              marginBlockEnd: 8,
            }}
          >
            <label
              style={{
                minWidth: 80,
              }}
              htmlFor="grouping"
            >
              Grouping
            </label>
            <select
              id="grouping"
              value={filter.grouping}
              style={{
                border: "none",
              }}
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
            <label
              style={{
                minWidth: 80,
              }}
              htmlFor="sorting"
            >
              Sorting
            </label>
            <select
              id="sorting"
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
