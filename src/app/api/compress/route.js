import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req, res) {
  try {
    const payload = await req.formData();
    const image = payload.get("image");
    if (!image) {
      return NextResponse.json(
        { message: "Image not found in request", success: false },
        { status: 404 }
      );
    }
    const buffer = await image.arrayBuffer();
    const quality = payload.get("quality") || 75;
    if (quality < 0 || quality > 100) {
      return NextResponse.json(
        { message: "Invalid quality value", success: false },
        { status: 400 }
      );
    }
    const image1 = (await sharp(buffer).jpeg({ quality: +quality }).toBuffer()).toString("base64");
    /*sharp(buffer)
      .jpeg({ quality: +quality })
      .toBuffer()
      .then((compressedBuffer) => {
        const compressedData = compressedBuffer.toString("base64");
        // Store compressedData if needed

        return NextResponse.json({ compressedData }, { status: 200 });
      })
      .catch((err) => {
        console.error(err);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      });*/
   return NextResponse.json(
     { message: "Data received", image: image1 },
     { status: 200 }
   );
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { message: "Invalid JSON data in request body" },
      { status: 404 }
    );
  }
}
