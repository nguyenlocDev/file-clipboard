"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import "../css/logoMarquen.css";

interface FileExtension {
  name: string;
  type:
    | "image"
    | "document"
    | "video"
    | "audio"
    | "code"
    | "data"
    | "archive"
    | "other";
}

interface FileExtensionMarqueeProps {
  extensions: FileExtension[];
  speed?: number;
  gap?: number;
  direction?: "left" | "right";
}

const FileExtensionMarquee: React.FC<FileExtensionMarqueeProps> = ({
  extensions,
  speed = 30,
  gap = 20,
  direction = "left",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Get color based on file type
  const getTypeColor = (type: FileExtension["type"]) => {
    switch (type) {
      case "image":
        return "#f43f5e"; // rose-500
      case "document":
        return "#3b82f6"; // blue-500
      case "video":
        return "#a855f7"; // purple-500
      case "audio":
        return "#f59e0b"; // amber-500
      case "code":
        return "#10b981"; // emerald-500
      case "data":
        return "#06b6d4"; // cyan-500
      case "archive":
        return "#6b7280"; // gray-500
      default:
        return "#64748b"; // slate-500
    }
  };

  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    if (!marqueeEl) return;

    const marqueeContent = marqueeEl.querySelector(
      ".marquee-content"
    ) as HTMLElement;
    if (!marqueeContent) return;

    // Clone the content to create a seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeEl.appendChild(clone);

    // Calculate the animation duration based on content width and speed
    const contentWidth = marqueeContent.offsetWidth;
    const duration = contentWidth / speed;

    // Apply the animation to all marquee content elements
    const contents = marqueeEl.querySelectorAll(".marquee-content");
    contents.forEach((content) => {
      const el = content as HTMLElement;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDirection = direction === "left" ? "normal" : "reverse";
    });
  }, [speed, direction]);

  return (
    <div className="w-full overflow-hidden px-2 py-0">
      <div ref={marqueeRef} className="marquee flex space-x-5">
        <div className="marquee-content" style={{ gap: `${gap}px` }}>
          {/* Left fade effect */}
          {extensions.map((ext, index) => (
            <div
              key={index}
              className="extension-badge"
              style={{ backgroundColor: getTypeColor(ext.type) }}
            >
              .{ext.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileExtensionMarquee;
