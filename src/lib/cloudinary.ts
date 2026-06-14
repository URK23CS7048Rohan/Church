import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "mock_cloud",
  api_key: process.env.CLOUDINARY_API_KEY || "mock_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "mock_secret",
  secure: true,
});

export { cloudinary };

export async function uploadImage(
  file: Buffer | string,
  folder = "sanctuary/photos"
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: 80, format: "webp" },
          { width: 1200, crop: "limit" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
        } else {
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        }
      }
    ).end(file);
  });
}

export function getOptimizedImageUrl(
  publicId: string,
  width = 800,
  quality = 80
): string {
  return cloudinary.url(publicId, {
    width,
    quality,
    format: "webp",
    crop: "fill",
    fetch_format: "auto",
  });
}
