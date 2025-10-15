import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary'

// Configure Cloudinary using environment variables.
// Preferred: provide CLOUDINARY_URL in .env.local, e.g.
// CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>
// Fallback: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
const cloudinaryUrl = process.env.CLOUDINARY_URL
if (cloudinaryUrl) {
    cloudinary.config({ secure: true, url: cloudinaryUrl })
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    })
} else {
    // If no credentials are present, we leave cloudinary unconfigured — callers should handle this.
    // This keeps the module safe to import in environments without Cloudinary configured (e.g. CI without env).
}

/**
 * Upload an image to Cloudinary.
 * @param source - remote URL or local file path / buffer supported by Cloudinary uploader
 * @param options - upload options passed to cloudinary.uploader.upload
 * @returns the UploadApiResponse or throws an error
 */
export async function uploadImage(source: string, options: UploadApiOptions = {}): Promise<UploadApiResponse> {
    if (!process.env.CLOUDINARY_URL && !(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)) {
        throw new Error('Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET in your environment.')
    }

    return cloudinary.uploader.upload(source, options)
}

/**
 * Generate a Cloudinary URL for a public id with transform options.
 * @param publicId - the public id (e.g. 'folder/image')
 * @param options - transformation and delivery options
 */
export function getImageUrl(publicId: string, options: Record<string, any> = {}): string {
    return cloudinary.url(publicId, options)
}

export default cloudinary