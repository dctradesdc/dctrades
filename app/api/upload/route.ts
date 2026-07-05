import { NextResponse } from "next/server";
import type {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

import cloudinary from "@/lib/cloudinary/server";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file = formData.get(
      "file"
    );

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result =
      await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "dctrades",
                resource_type: "image",
              },
              (
                error:
                  | UploadApiErrorResponse
                  | undefined,
                uploadResult:
                  | UploadApiResponse
                  | undefined
              ) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!uploadResult) {
                  reject(
                    new Error(
                      "Cloudinary upload failed."
                    )
                  );
                  return;
                }

                resolve(uploadResult);
              }
            );

          stream.end(buffer);
        }
      );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(
      "Cloudinary Upload Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to upload image.",
      },
      {
        status: 500,
      }
    );
  }
}