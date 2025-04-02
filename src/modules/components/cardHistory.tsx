/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Download, Share2, Edit2, Clock, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PropsFileInfo } from "@/page/homepage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRious } from "react-qrious";

interface FileHistoryProps {
  files: PropsFileInfo[];
  onDownload?: (file: PropsFileInfo) => void;
  onShare?: (file: PropsFileInfo) => void;
  onDelete?: (fileId: number) => void;
  onRename?: (fileId: number, newName: string) => void;
}

export function FileHistory({
  files,
  onDownload,
  onShare,
  onDelete,
  onRename,
}: FileHistoryProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filePopup, setFilePopup] = useState<PropsFileInfo | null>(null);

  const totalSize = files.reduce((total, file) => {
    if (!file.size) return total;

    // Nếu file.size đã là số, sử dụng trực tiếp
    if (typeof file.size === "number") return total + file.size;

    // Nếu file.size là chuỗi, phân tích để lấy số và đơn vị
    const sizeStr = String(file.size);
    const sizeMatch = sizeStr.match(/(\d+(\.\d+)?)/);
    const unit = sizeStr.match(/[A-Za-z]+/);

    if (!sizeMatch) return total;

    const size = Number.parseFloat(sizeMatch[0]);
    const unitStr = unit ? unit[0].toUpperCase() : "B";

    let bytes = size;
    if (unitStr === "KB") bytes = size * 1024;
    if (unitStr === "MB") bytes = size * 1024 * 1024;
    if (unitStr === "GB") bytes = size * 1024 * 1024 * 1024;

    return total + bytes;
  }, 0);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
  };

  const getTimeLeft = (date?: Date) => {
    if (!date) return null;

    const now = new Date();
    // const diff = date.getTime() - now.getTime();

    // if (diff <= 0) return "Expired";

    // const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // if (days > 0) return `${days}d`;

    // const hours = Math.floor(diff / (1000 * 60 * 60));
    // if (hours > 0) return `${hours}h`;

    // const minutes = Math.floor(diff / (1000 * 60));
    // return `${minutes}m`;
  };

  const isImage = (type: string) => {
    return type.startsWith("image/");
  };

  const handleFileClick = (file: PropsFileInfo) => {
    setFilePopup(file);
  };

  const handleDownloadAll = () => {};

  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full border rounded-lg shadow-sm bg-white">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Shared by You</span>
          <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
            Viewer
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {files[0]?.name || "Uploaded Files"}
            </h2>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Edit2 className="h-4 w-4 text-primary" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button className="rounded-full flex cursor-pointer items-center gap-2 bg-primary">
              <Share2 className="text-white  h-4 w-4" />
              <span className="text-white">Share</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {files[0]?.created_at && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Expires in {getTimeLeft(files[0].created_at as Date)}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>
              {files.length} {files.length === 1 ? "File" : "Files"}
            </span>
          </div>
          <div>
            <span>{formatSize(totalSize)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded-lg overflow-hidden relative group cursor-pointer"
              onClick={() => handleFileClick(file)}
            >
              <div className="aspect-square bg-muted relative flex items-center justify-center">
                <img
                  src={
                    file.name ? `/${file.name.split(".")[1]}.png` : "/unk.png"
                  }
                  alt={file.name as string}
                  className="object-cover"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) onDelete(file.id as number);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="p-2">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size ? formatSize(Number(file.size)) : "0B"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <Button
          variant="outline"
          className="flex items-center gap-2 p-5 rounded-4xl bg-primary text-white cursor-pointer hover:bg-primary/5"
          onClick={handleDownloadAll}
        >
          <Download className="h-4 w-4" />
          <span>Download All</span>
        </Button>
      </div>

      {/* File Info Popup */}
      <Dialog
        open={filePopup !== null}
        onOpenChange={(open) => !open && setFilePopup(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Information</DialogTitle>
          </DialogHeader>

          {filePopup && (
            <div className="grid gap-4">
              <div className="aspect-square max-w-[200px] mx-auto bg-muted relative flex items-center justify-center rounded-md overflow-hidden">
                <img
                  src={
                    filePopup.mimetype
                      ? `/${filePopup.name?.split(".")[1]}.png`
                      : "/unk.png"
                  }
                  alt={filePopup.name as string}
                  className="object-cover"
                />
              </div>

              <div className="grid gap-2 w-full">
                <div className="flex justify-between w-full">
                  <span className="font-medium">Name:</span>
                  <p className="w-[200px] truncate text-end">
                    {filePopup.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Size:</span>
                  <p>
                    {filePopup.size ? formatSize(Number(filePopup.size)) : "0B"}
                  </p>
                </div>
                {filePopup.created_at && (
                  <div className="flex justify-between">
                    <span className="font-medium">Created:</span>
                    <span>
                      {new Date(filePopup.created_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-4">
                <QRious
                  value={filePopup.download_url as string}
                  size={200}
                  foreground="#00934b" // Custom foreground color
                  background="white" // Background color
                  level="L" // Error correction level
                  padding={10}
                />
                <Button
                  className="w-full text-white"
                  onClick={() => {
                    downloadFile(filePopup.download_url as string);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
