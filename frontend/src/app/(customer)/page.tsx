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
            transition: "font-size 0.3s ease",
          }}
        />
      </div>

      {/* CSS for dynamic resizing */}
      <style jsx>{`
        input::placeholder {
          font-size: 1.2rem;
        }

        @media (max-width: 1200px) {
          input::placeholder {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 992px) {
          input::placeholder {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          input::placeholder {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          input::placeholder {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
