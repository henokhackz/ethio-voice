import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUD_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUD_API_KEY_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_KEY_SECRET) {
  throw new Error("Missing environment variables");
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_KEY_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    CLOUD_API_KEY_SECRET as string
  );

  return Response.json({ signature });
}
