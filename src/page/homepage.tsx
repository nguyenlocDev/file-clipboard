/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileHistory } from "@/modules/components/cardHistory";
import { Footer } from "@/modules/components/footer";
import { FileUploader } from "@/modules/components/uploadfile";
import { useState } from "react";
import Header from "@/modules/components/header";
export interface PropsFileInfo {
  download_url: string | null;
  name: string | null;
  size: number | null;
  id: number | null;
  created_at: number | Date | null;
  play_url: string | null;
  mimetype: string | null;
}

const HomePage = () => {
  const initialFiles: PropsFileInfo[] = JSON.parse(
    localStorage.getItem("dataFile") as string
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState(initialFiles);
  const handleFileSelect = (file: File | null, dataFile: PropsFileInfo) => {
    setSelectedFile(file);
    if (file) {
      setFiles([dataFile, ...files]);
      setSelectedFile(null);
    }
  };
  const handleDelete = (fileId: number) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
    localStorage.setItem("dataFile", JSON.stringify(updatedFiles));
  };

  const handleDownload = (file: any) => {
    console.log(`Downloading file: ${file.name}`);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Header />
      <div className="max-w-[1200px] mx-auto mt-20 p-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Tải lên</h1>
          <FileUploader onFileSelect={handleFileSelect} maxSizeMB={5} />
          {selectedFile && (
            <div className="p-4 bg-muted rounded-lg mt-4">
              <h2 className="font-medium">Selected File:</h2>
              <p className="text-sm mt-1">Name: {selectedFile.name}</p>
              <p className="text-sm">Type: {selectedFile.type}</p>
              <p className="text-sm">
                Size: {(selectedFile.size / 1024).toFixed(3)} KB
              </p>
            </div>
          )}
        </div>
        {files.length > 0 && (
          <div className="mt-10">
            <h1 className="text-3xl font-bold">Lịch sử tải lên</h1>

            <div className="mt-5 flex flex-col space-y-5">
              <FileHistory
                files={files}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
