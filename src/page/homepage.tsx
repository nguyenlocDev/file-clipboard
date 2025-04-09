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
      {/* upload file */}
      <div
        className="w-full mx-auto mt-20 p-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="flex flex-col space-y-4">
          <FileUploader onFileSelect={handleFileSelect} />
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
        {files?.length > 0 && (
          <div
            className="mt-10 container mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-3xl font-bold text-primary">Lịch sử tải lên</h1>
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
      {/* secion */}
      <MediaFireFeatures></MediaFireFeatures>
      <MediaFirePremiumFeatures></MediaFirePremiumFeatures>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;

export function MediaFireFeatures() {
  return (
    <div
      className="container mx-auto px-4 py-12 mt-20 p-4"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1
        className="text-4xl text-primary font-semibold w-full text-center mb-20"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Các tính năng hàng đầu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <text x="7" y="15" fontSize="5" fill="white" fontWeight="bold">
                10GB
              </text>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            10GB Miễn phí/Lên đến 4GB mỗi tệp
          </h3>
          <p className="text-gray-700">
            Với lên đến 50GB không gian miễn phí, bạn có thể sử dụng MediaFire
            để sao lưu tất cả các tệp quan trọng của bạn – thậm chí cả những tệp
            không quá quan trọng.
          </p>
        </div>

        {/* Feature 2 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Băng thông & tải xuống không giới hạn
          </h3>
          <p className="text-gray-700">
            Đảm bảo các bản tải xuống của bạn luôn có sẵn và nhanh chóng. Bạn sẽ
            không bao giờ gặp phải giới hạn băng thông hoặc tải xuống với các
            bản tải xuống được hỗ trợ quảng cáo, bất kể tệp của bạn phổ biến đến
            mức nào.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 7 3 5l2-2" />
              <path d="M7 3 5 5l2 2" />
              <path d="M19 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H5" />
              <path d="m18 16 2 2 2-2" />
              <path d="m20 14 2 2-2 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Dễ dàng chia sẻ sau khi tải lên
          </h3>
          <p className="text-gray-700">
            Chia sẻ thư mục và tệp ngay lập tức sau khi chúng được tải lên.
            MediaFire giúp việc chia sẻ qua email, trên trang web của bạn, mạng
            xã hội, tin nhắn, hoặc bất kỳ đâu với một liên kết trở nên dễ dàng.
          </p>
        </div>

        {/* Feature 4 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 17h4V5H2v12h3" />
              <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
              <path d="M14 17h1" />
              <circle cx="7.5" cy="17.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Tải lên nhiều tệp cùng lúc</h3>
          <p className="text-gray-700">
            Tải lên hàng trăm hoặc thậm chí hàng nghìn tệp cùng lúc thông qua
            bất kỳ trình duyệt web nào hoặc với các ứng dụng tiện dụng của chúng
            tôi cho Android, BlackBerry, Windows, iPhone, hoặc iPad.
          </p>
        </div>

        {/* Feature 5 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
              <path d="M12 7V3a1 1 0 0 0-1-1H7.5a1 1 0 0 0-.71.29L4.29 4.8a1 1 0 0 0-.29.7V7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Tổ chức dễ dàng</h3>
          <p className="text-gray-700">
            Giúp việc tìm kiếm tài liệu và tệp của bạn trở nên dễ dàng bằng cách
            sử dụng trình quản lý tệp mạnh mẽ nhưng dễ sử dụng của MediaFire.
            Tải lên, sao chép, di chuyển và kiểm soát quyền truy cập vào tệp của
            bạn từ bất kỳ đâu với máy tính hoặc điện thoại của bạn.
          </p>
        </div>

        {/* Feature 6 */}
        <div
          className="flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="bg-primary text-white p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.9 4.9 14.2 14.2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Liên kết một lần</h3>
          <p className="text-gray-700">
            Kiểm soát các bản tải xuống của bạn. Chia sẻ tệp bằng Liên kết một
            lần miễn phí và người nhận sẽ không thể chia sẻ liên kết với bất kỳ
            ai khác. Nó hoàn hảo cho các tài liệu cá nhân hoặc công việc nhạy
            cảm!
          </p>
        </div>
      </div>
    </div>
  );
}

export function MediaFirePremiumFeatures() {
  return (
    <div
      className="container mx-auto px-4 py-12 bg-gray-50"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="text-4xl text-primary font-semibold w-full text-center mb-20">
        Các tính năng độc quyền khi mua gói PRO.
      </h1>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <text
                x="32"
                y="36"
                fontFamily="Arial"
                fontSize="16"
                fontWeight="bold"
                fill="#4CAF50"
                textAnchor="middle"
              >
                1TB
              </text>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">1 TB lưu trữ</h3>
          <p className="text-gray-700">
            Thêm không gian cho các tệp lớn như video, PDF và âm thanh. Tất cả
            không gian bạn cần cho các tệp kinh doanh quan trọng của bạn.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M20 20L44 44M44 20L20 44"
                stroke="#4CAF50"
                strokeWidth="4"
              />
              <path
                d="M32 20V36M32 36L26 30M32 36L38 30"
                stroke="#4CAF50"
                strokeWidth="4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Không quảng cáo</h3>
          <p className="text-gray-700">
            Một trải nghiệm chuyên nghiệp hơn, không có quảng cáo cho nhân viên
            và khách hàng của bạn.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="36"
                r="12"
                stroke="#4CAF50"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M32 24V36M32 36L26 30"
                stroke="#4CAF50"
                strokeWidth="3"
              />
              <path d="M24 36H40" stroke="#4CAF50" strokeWidth="3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Tải lên từ bất kỳ trang web nào
          </h3>
          <p className="text-gray-700">
            Tiết kiệm hàng giờ thời gian: bỏ qua việc tải xuống và chuyển tệp
            trực tiếp từ bất kỳ trang web nào vào kho lưu trữ MediaFire của bạn!
            Chỉ cần dán bất kỳ liên kết nào đến một tệp và MediaFire sẽ tự động
            tải lên vào tài khoản của bạn.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M32 24V44M32 44L26 38M32 44L38 38"
                stroke="#4CAF50"
                strokeWidth="3"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Liên kết tải xuống trực tiếp đến tệp
          </h3>
          <p className="text-gray-700">
            Bỏ qua MediaFire.com khi chia sẻ tệp. Tải xuống trực tiếp từ trang
            web, email hoặc mạng xã hội của riêng bạn. Phát trực tuyến phương
            tiện và hình ảnh độ phân giải cao trong trình phát phương tiện của
            riêng bạn.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <rect
                x="24"
                y="24"
                width="16"
                height="20"
                stroke="#4CAF50"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M28 30H36M28 34H36M28 38H32"
                stroke="#4CAF50"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Tải xuống hàng loạt</h3>
          <p className="text-gray-700">
            Chỉ với một cú nhấp chuột, bạn có thể tải xuống toàn bộ bộ sưu tập
            ảnh, tệp dự án hoặc tài liệu công việc trong một tệp ZIP thuận tiện.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="flex flex-col items-start">
          <div className="text-green-500 mb-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4L59.7128 20V44L32 60L4.28719 44V20L32 4Z"
                stroke="#4CAF50"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M24 32H40M40 32C40 32 40 28 36 28C32 28 32 32 32 32M24 32C24 32 24 36 28 36C32 36 32 32 32 32"
                stroke="#4CAF50"
                strokeWidth="3"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Liên kết một lần (100/ngày)
          </h3>
          <p className="text-gray-700">
            Kiểm soát quyền truy cập vào các bản tải xuống của bạn và đảm bảo
            mọi người không chia sẻ liên kết tải xuống của bạn. Liên kết một lần
            chỉ cho phép một máy tính tải xuống tệp của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
