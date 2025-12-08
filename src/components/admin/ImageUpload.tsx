"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    endpoint: "profileImage" | "projectImage";
}

export function ImageUpload({ value, onChange, onRemove, endpoint }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    if (value) {
        return (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-border">
                <img
                    src={value}
                    alt="Uploaded image"
                    className="w-full h-full object-cover"
                />
                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <div className="w-40 h-40 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs">No image</span>
                </div>
            </div>
            <UploadButton
                endpoint={endpoint}
                onUploadBegin={() => setIsUploading(true)}
                onClientUploadComplete={(res) => {
                    setIsUploading(false);
                    if (res && res[0]) {
                        onChange(res[0].ufsUrl);
                    }
                }}
                onUploadError={(error: Error) => {
                    setIsUploading(false);
                    console.error("Upload error:", error.message);
                    alert(`Upload failed: ${error.message}`);
                }}
                appearance={{
                    button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium",
                    allowedContent: "text-xs text-muted-foreground",
                }}
            />
        </div>
    );
}
