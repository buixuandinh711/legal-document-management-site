import { RingLoader } from "react-spinners";

export default function ContentLoading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexGrow: 1,
      }}
    >
      <RingLoader size={100} color={"#0066CC"} loading={true} />
    </div>
  );
}
