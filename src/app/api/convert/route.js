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
    const formate = payload.get("formate") || "jpeg";
    
    const image1 = (
      await sharp(buffer).toFormat(formate).toBuffer()
    ).toString("base64");

    return NextResponse.json(
      { message: "Data received", image: image1, formate: formate},
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
