import React from "react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";


export default function SmartReply() {
  const replies = [
    {
      title: "Account Verified",
      highlight: "Verified",
      message:
        "Hi Mike Geller, we've verified your account and everything looks good. You should now be able to access all features. Please restart the app to see the update.",
    },
    {
      title: "Account Under Review",
      highlight: "Review",
      message:
        "Hi Mike Geller, your account is currently under review. Our team will complete the verification within 24 hours. We'll notify you once it's done.",
    },
  ];

  return (
    <div
      style={{
        width: "85%",
        margin: "40px auto",
        background: colors.cardBg,
        padding: "50px 60px",
        borderRadius: "34px",
      }}
    >
      {/* TITLE ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: colors.textPrimary,
            fontSize: "42px",
            fontWeight: 700,
          }}
        >
          Smart <span style={{ color: colors.accent }}>Reply</span>
        </h1>

        <div style={{ width: "160px" }}>
          <FilterDropDown
            defaultLabel="All Types"
            options={["All Types", "Account", "Payment", "Review"]}
          />
        </div>
      </div>

      {/* REPLY CARDS */}
      <div style={{ display: "grid", gap: "24px" }}>
        {replies.map((item, index) => (
          <div
            key={index}
            style={{
              background: colors.inputBg,
              padding: "26px 30px",
              borderRadius: "20px",
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                color: colors.textPrimary,
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {item.title.split(" ")[0]}{" "}
              <span style={{ color: colors.accent }}>{item.highlight}</span>
            </h2>

            <p
              style={{
                color: colors.textSecondary,
                fontSize: "15px",
                lineHeight: 1.5,
                width: "90%",
              }}
            >
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

