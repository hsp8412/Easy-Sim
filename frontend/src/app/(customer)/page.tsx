"use client";

import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

  const countries = [
    { country: "Canada", flag: "canada" },
    { country: "U.S.A", flag: "usa" },
    { country: "Mexico", flag: "mexico" },
    { country: "Japan", flag: "japan" },
    { country: "U.K", flag: "uk" },
    { country: "France", flag: "france" },
    { country: "Italy", flag: "italy" },
    { country: "Spain", flag: "spain" },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = countries.filter((item) =>
      item.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #00bcd4, #4caf50)",
          padding: "50px",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          margin: "0 30px",
        }}
      >
        <div className="easy-sim-title">Easy SIM</div>
        <div className="easy-sim-slogan">
          Stay Connected While Travelling Abroad Like Never Before!
        </div>

        <div
          style={{
            marginTop: "30px",
            position: "relative",
            maxWidth: "500px",
            width: "100%",
            margin: "30px auto",
          }}
        >
          <input
            type="text"
            placeholder="Search over 130 countries..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: "10px 40px 10px 20px",
              fontSize: "16px",
              borderRadius: "20px",
              border: "none",
              width: "100%",
              marginTop: "0px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              color: "black",
              transition: "font-size 0.3s ease",
            }}
          />
          {searchQuery && filteredCountries.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "0",
                right: "0",
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
                border: "1px solid #ddd",
              }}
            >
              {filteredCountries.map(({ country, flag }, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    fontSize: "16px",
                    color: "#000",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "#fff";
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "20px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      overflow: "hidden",
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
                  <span>{country}</span>
                </div>
              ))}
            </div>
          )}
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
          <span
            className="most-visited-text"
            style={{
              background: "linear-gradient(135deg, #00bcd4, #4caf50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
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
        {countries.map(({ country, flag }, index) => (
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

        /* Media queries for dynamic font size of Easy SIM title */
        .easy-sim-title {
          font-size: 42px; /* Default size */
        }

        @media (max-width: 1200px) {
          .easy-sim-title {
            font-size: 36px;
          }
        }

        @media (max-width: 992px) {
          .easy-sim-title {
            font-size: 30px;
          }
        }

        @media (max-width: 768px) {
          .easy-sim-title {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .easy-sim-title {
            font-size: 22px;
          }
        }

        /* Media queries for dynamic font size of Easy SIM slogan */
        .easy-sim-slogan {
          font-size: 22px; /* Default size */
        }

        @media (max-width: 1200px) {
          .easy-sim-slogan {
            font-size: 20px;
          }
        }

        @media (max-width: 992px) {
          .easy-sim-slogan {
            font-size: 18px;
          }
        }

        @media (max-width: 768px) {
          .easy-sim-slogan {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .easy-sim-slogan {
            font-size: 14px;
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
