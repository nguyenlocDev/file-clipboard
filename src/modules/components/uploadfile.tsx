/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Plus, X, FileIcon, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUriPostFile, postFile, postSuccessFile } from "@/lib/api";
import { PropsFileInfo } from "@/page/homepage";

interface FileUploaderProps {
  onFileSelect: (file: File | null, dataFile: PropsFileInfo) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  onFileSelect,
  acceptedFileTypes = "*",
  maxSizeMB = 100,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024 * 1024;
  console.log(maxSizeBytes);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file size
    console.log(file.size);
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    // Check file type if specific types are required
    if (acceptedFileTypes !== "*") {
      const fileType = file.type;
      const acceptedTypes = acceptedFileTypes.split(",");

      if (!acceptedTypes.some((type) => fileType.includes(type.trim()))) {
        setError(`Invalid file type. Accepted: ${acceptedFileTypes}`);
        return false;
      }
    }

    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      uploadFile(droppedFile);
    }
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) {
        clearInterval(interval);
        progress = 90;
      }
      setUploadProgress(Math.min(progress, 90));
    }, 300);

    return interval;
  };
  const updeatLocalStore = (data: object) => {
    let storedData = JSON.parse(localStorage.getItem("dataFile") as any);

    if (!storedData) {
      storedData = [];
    }
    storedData.push(data);
    localStorage.setItem("dataFile", JSON.stringify(storedData));
  };
  const uploadFile = async (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      try {
        setFile(selectedFile);
        setIsUploading(true);
        setUploadStatus("uploading");

        const progressInterval = simulateProgress();

        const authToken = localStorage.getItem("authToken") as string;

        const getUrlUploadFile = await getUriPostFile(
          authToken,
          selectedFile.size,
          selectedFile.name
        );

        if (getUrlUploadFile.location) {
          await postFile(
            authToken,
            selectedFile.size,
            selectedFile.name,
            getUrlUploadFile.location.split("upload/")[1]
          );

          const reader = new FileReader();
          reader.onload = async (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              const fileContent = e.target.result as ArrayBuffer;
              try {
                const response = await postSuccessFile(
                  authToken,
                  fileContent,
                  selectedFile.name,
                  getUrlUploadFile.location.split("upload/")[1]
                );

                clearInterval(progressInterval);
                setUploadProgress(100);
                setUploadStatus("success");
                updeatLocalStore(response);
                onFileSelect(selectedFile, response);
              } catch (error) {
                clearInterval(progressInterval);
                setUploadStatus("error");
                setError("Upload failed. Please try again.");
                console.error("Upload thất bại:", error);
              } finally {
                setIsUploading(false);
              }
            }
          };

          reader.readAsArrayBuffer(selectedFile);
        }
      } catch (error) {
        setUploadStatus("error");
        setError("Failed to initiate upload. Please try again.");
        setIsUploading(false);
        console.error("Upload error:", error);
      }
    } else {
      onFileSelect(null, {
        download_url: null,
        name: null,
        size: null,
        id: null,
        created_at: null,
        play_url: null,
        mimetype: null,
      });
    }
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      uploadFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setIsUploading(false);
    onFileSelect(null, {
      download_url: null,
      name: null,
      size: null,
      id: null,
      created_at: null,
      play_url: null,
      mimetype: null,
    });

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full container mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptedFileTypes}
        className="hidden"
      />

      <div
        className={`
          border-2 border-dashed md:h-[400px] flex flex-col justify-center items-center rounded-lg p-6 transition-colors ${
            !isUploading ? "cursor-pointer" : ""
          }
          ${isDragging ? "border-primary bg-primary/5" : "border-border "}
          ${error ? "border-destructive bg-destructive/5" : ""}
          ${file && !error ? "bg-primary/5 border-primary" : ""}
          ${isUploading ? "pointer-events-none" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={isUploading ? undefined : handleSelectFile}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">kéo hoặc thả file vào đây</p>
              <p className="text-xs text-muted-foreground mt-1">chọn file</p>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(3)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {uploadStatus === "success" && (
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                )}
                {!isUploading && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="h-8 w-8 rounded-full"
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                    <span>Uploading...</span>
                  </div>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-1.5 w-full" />
              </div>
            )}

            {uploadStatus === "error" && !isUploading && (
              <div className="text-xs text-destructive flex items-center gap-1.5">
                <X className="h-3 w-3" />
                <span>Upload failed. Please try again.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && !isUploading && (
        <p className="text-destructive text-xs mt-2">{error}</p>
      )}
    </div>
  );
}
