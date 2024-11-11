"use client";

export default function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00bcd4, #4caf50)",
        padding: "50px",
        borderRadius: "15px",
        textAlign: "center",
        color: "white",
        fontSize: "32px",
        fontWeight: "bold",
        margin: "0 30px",
      }}
    >
      <div>Easy SIM</div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "normal",
        }}
      >
        stay connected while travelling abroad like never before!
      </div>

      <div style={{ marginTop: "30px", position: "relative" }}>
        <input
          type="text"
          placeholder="Search over 130 countries"
          style={{
            padding: "10px 40px 10px 10px",
            fontSize: "16px",
            borderRadius: "20px",
            border: "none",
            width: "80%",
            maxWidth: "400px",
            marginTop: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            color: "black",
          }}
        />
      </div>
    </div>
  );
}
