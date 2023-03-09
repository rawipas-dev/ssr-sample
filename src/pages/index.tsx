import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        width: `100%`,
        height: `100%`,
        position: "fixed",
      }}
    >
      <div style={{ top: `50%`, left: `50%`, position: "fixed" }}>
        <Link href="/customers?limit=10">CUSTOMERS</Link>
      </div>
    </div>
  );
}
