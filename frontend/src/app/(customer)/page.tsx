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
          fontSize: "42px",
          fontWeight: "bold",
          margin: "0 30px",
        }}
      >
        <div>Easy SIM</div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "22px",
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
              maxWidth: "500px",
              marginTop: "0px",
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
        {/* 8 Smaller Divs with Country Names and Flags */}
        {[
          { country: "Canada", flag: "canada" },
          { country: "U.S.A", flag: "usa" },
          { country: "Mexico", flag: "mexico" },
          { country: "Japan", flag: "japan" },
          { country: "U.K", flag: "uk" },
          { country: "France", flag: "france" },
          { country: "Italy", flag: "italy" },
          { country: "Spain", flag: "spain" },
        ].map(({ country, flag }, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              height: "120px",
              backgroundColor: "#ffffff",
              border: "2px solid #000000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              paddingLeft: "20px",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#ffffff";
            }}
          >
            {/* Flag */}
            <div
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "10px",
                overflow: "hidden",
                marginRight: "15px",
                border: "1px solid #000000",
              }}
            >
              <img
                src={`/assets/${flag}Flag.png`}
                alt={`${country} flag`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            {/* Country Name */}
            <div style={{ color: "#000000", fontSize: "25px" }}>{country}</div>
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
      `}</style>
    </div>
  );
}
