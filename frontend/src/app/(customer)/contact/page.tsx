"use client";

export default function Home() {
  return (
    <div>
      {/* Green/Blue Gradient Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #00bcd4, #4caf50)",
          padding: "20px",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          margin: "0 30px",
        }}
      >
        <div className="title">How May We Help?</div>
      </div>

      {/* CSS for dynamic resizing */}
      <style jsx>{`
        /* Media queries for dynamic font size of title */
        .title {
          font-size: 42px; /* Default size */
        }

        @media (max-width: 1200px) {
          .title {
            font-size: 36px;
          }
        }

        @media (max-width: 992px) {
          .title {
            font-size: 30px;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
