import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            // This code runs on your server before upload
            // You can add authentication here if needed
            return { uploadedBy: "admin" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.uploadedBy);
            console.log("file url", file.ufsUrl);

            // Return the file URL to be used in the client
            return { uploadedBy: metadata.uploadedBy, url: file.ufsUrl };
        }),

    // For project cover images
    projectImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
        .middleware(async () => {
            return { uploadedBy: "admin" };
        })
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
