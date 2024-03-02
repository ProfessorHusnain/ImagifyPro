import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
    }
    
    // Parse the incoming request
    const bodyParser = await req.body;

    console.log(bodyParser);
    bodyParser.parse(
      req,
      async (
        err: any,
        fields: Record<string, any>,
        files: Record<string, any>
      ) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        const image = files.image;
        console.log(image);

        if (!image) {
          return res.status(400).json({ error: "No image provided" });
        }
        // Compress the image
        const originalBuffer = await sharp(image[0].filepath).toBuffer();
        const quality = fields.quality || 75;
        console.log(quality);
        try {
          const compressedBuffer = await sharp(originalBuffer)
            .jpeg({ quality: +quality })
            .toBuffer();
          const compressedData = compressedBuffer.toString("base64");
          return res.json({ compressedData });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
}


   
 
// Compare this snippet from src/app/api/compress/route.ts:
