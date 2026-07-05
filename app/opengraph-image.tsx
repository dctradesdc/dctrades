import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const imageUrl =
  "https://res.cloudinary.com/dniwuwt6j/image/upload/v1783278365/Gemini_Generated_Image_sxqqm9sxqqm9sxqq_yb3qvw.png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    ),
    size
  );
}