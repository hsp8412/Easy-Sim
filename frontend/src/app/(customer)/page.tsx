"use client";

export default function Home() {
  return (
    <div>
      {/* Green/Blue Gradient Section */}
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
          Stay Connected While Travelling Abroad Like Never Before!
        </div>

        <div style={{ marginTop: "30px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search over 130 countries..."
            style={{
              padding: "10px 40px 10px 20px",
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
      </div>

      {/* "Most Visited" Section Below the Gradient */}
      <div
        style={{
          marginTop: "0px",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            paddingLeft: "20px",
          }}
        >
          <span
            className="most-visited-text"
            style={{
              marginRight: "10px",
            }}
          >
            🔥
          </span>
          <span className="most-visited-text" style={{ color: "#000000" }}>
            Most Visited
          </span>
        </div>

        {/* Horizontal Black Line */}
        <hr
          style={{
            marginTop: "10px",
            border: "0",
            borderTop: "2px solid black",
            width: "97%",
            margin: "20px auto",
          }}
        />
      </div>

      {/* New Section with Curved Divs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "0px",
        }}
      >
        {/* 8 Smaller Divs */}
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#2196f3",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {`Div ${index + 1}`}
          </div>
        ))}
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

        /* Media queries for dynamic font size of Most Visited text */
        .most-visited-text {
          font-size: 20px; /* Default size */
        }

        @media (max-width: 1200px) {
          .most-visited-text {
            font-size: 18px;
          }
        }

        @media (max-width: 992px) {
          .most-visited-text {
            font-size: 16px;
          }
        }

        @media (max-width: 768px) {
          .most-visited-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .most-visited-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
