import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Shinhotek industrial optical solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function toDataUrl(filePath: string) {
  const buffer = await readFile(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const icon = await toDataUrl(path.join(process.cwd(), "app", "icon.png"));
  const logo = await toDataUrl(path.join(process.cwd(), "public", "shinhotek-logo.svg"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(140deg, #081b31 0%, #10365f 52%, #0b2341 100%)",
          color: "white",
          overflow: "hidden",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.22,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -40,
            width: 420,
            height: 420,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(89,205,255,0.32) 0%, rgba(89,205,255,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 88,
            bottom: 74,
            width: 240,
            height: 240,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.22)",
            background:
              "radial-gradient(circle, rgba(120,208,255,0.24) 0%, rgba(120,208,255,0) 62%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 164,
              height: 164,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 58%, rgba(255,255,255,0.02) 100%)",
            }}
          >
            <img
              src={icon}
              alt="Shinhotek icon"
              width={92}
              height={92}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 64px 56px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Shinhotek"
              width={318}
              height={86}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxWidth: 640,
              marginBottom: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 12.6,
                letterSpacing: "0.24em",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
              }}
            >
              INDUSTRIAL OPTICAL SOLUTIONS
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 39.2,
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              <span>Reliable optical systems</span>
              <span>for precision inspection</span>
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 560,
                fontSize: 16.8,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Laser beam profiling, optical measurement, industrial integration,
              and application-focused inspection workflows.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
