import { FetchDataType } from "@/App";

interface TicketProps {
  ticket: FetchDataType["tickets"][number];
  user: FetchDataType["users"][number];
}

function Ticket({ ticket, user }: TicketProps) {
  return <div>{JSON.stringify({ ticket, user })}</div>;
}

export default Ticket;
