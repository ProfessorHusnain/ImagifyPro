// pages/api/compress.js
import sharp from "sharp";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; json: (arg0: { compressedData: string; }) => void; }) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const image = files.image;

    if (!image) {
        res.status(400).json({ error: "No image provided" });
        return;
    }

    const originalBuffer = await sharp(image[0].filepath).toBuffer();
    const quality = fields.quality || 75;

    try {
      const compressedBuffer = await sharp(originalBuffer)
        .jpeg({ quality: +quality })
        .toBuffer();

      const compressedData = compressedBuffer.toString("base64");
      res.json({ compressedData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
