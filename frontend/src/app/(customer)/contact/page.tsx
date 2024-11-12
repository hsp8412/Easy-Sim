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

      {/* White Form Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          margin: "20px 30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          color: "black",
        }}
      >
        <form>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="firstName"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name..."
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="lastName"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name..."
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email..."
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="helpRequest"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                display: "block",
                marginBottom: "5px",
              }}
            >
              What Can We Help You With?
            </label>
            <textarea
              id="helpRequest"
              placeholder="Enter your help request..."
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                height: "150px",
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#48a0f8",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "30px",
              fontSize: "16px",
              cursor: "pointer",
              width: "100px",
              marginTop: "0px",
            }}
          >
            Submit
          </button>
        </form>
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
