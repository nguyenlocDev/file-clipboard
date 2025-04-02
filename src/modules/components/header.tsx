import { Button } from "@/components/ui/button";
import { SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Sheet } from "lucide-react";
import { Link } from "react-router-dom";
import FileExtensionMarquee from "./logoMarquen";

const Header = () => {
  const isMobile = useIsMobile();
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const fileExtensions = [
    { name: "png", type: "image" as const },
    { name: "jpg", type: "image" as const },
    { name: "gif", type: "image" as const },
    { name: "webp", type: "image" as const },
    { name: "svg", type: "image" as const },
    { name: "pdf", type: "document" as const },
    { name: "docx", type: "document" as const },
    { name: "xlsx", type: "data" as const },
    { name: "csv", type: "data" as const },
    { name: "json", type: "data" as const },
    { name: "xml", type: "data" as const },
    { name: "html", type: "code" as const },
    { name: "css", type: "code" as const },
    { name: "js", type: "code" as const },
    { name: "tsx", type: "code" as const },
    { name: "py", type: "code" as const },
    { name: "mp4", type: "video" as const },
    { name: "mov", type: "video" as const },
    { name: "mp3", type: "audio" as const },
    { name: "wav", type: "audio" as const },
    { name: "zip", type: "archive" as const },
    { name: "rar", type: "archive" as const },
    { name: "txt", type: "document" as const },
  ];
  return (
    <>
      <div className="fixed bg-white z-20 w-full flex flex-wrap items-center p-3 border-b border-gray-200 ">
        <div className="flex items-center space-x-2 text-2xl font-semibold">
          <img className="fill-primary h-8 w-8" src="logo.svg" alt="logo" />
          <span>File Clipboard</span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex ml-5 items-center space-x-4">
            <Link
              to={"/"}
              onClick={() => scrollToElement("home")}
              className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 ease-linear after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Trang Chủ
            </Link>
            <Link
              to={"/#about"}
              onClick={() => scrollToElement("about")}
              className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 ease-linear after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Về Chúng Tôi
            </Link>
            <Link
              to={"/dashboard"}
              className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 ease-linear after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Trang Quảng Trị
            </Link>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className=" flex-1 flex justify-end">
            <Sheet>
              <SheetTrigger asChild className="">
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="p-5 flex flex-col space-y-4 mt-8">
                  <Link
                    to={"/"}
                    onClick={() => scrollToElement("home")}
                    className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 py-2"
                  >
                    Trang Chủ
                  </Link>
                  <Link
                    to={"/#about"}
                    onClick={() => scrollToElement("about")}
                    className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 py-2"
                  >
                    Về Chúng Tôi
                  </Link>
                  <Link
                    to={"/dashboard"}
                    className="relative hover:text-primary font-medium text-gray-500 transition-all duration-200 py-2"
                  >
                    Trang Quảng Trị
                  </Link>
                </div>
                <div className="flex space-y-2 flex-col p-5">
                  <Button
                    className="cursor-pointer rounded-4xl p-5 bg-gray-200"
                    variant={"outline"}
                  >
                    <Link to={"/signin"}>Đăng nhập</Link>
                  </Button>
                  <Button className="cursor-pointer text-white rounded-4xl p-5">
                    <Link to={"/signup"}>Đăng ký tài khoản</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        <div className="flex ml-auto space-x-2">
          {!isMobile ? (
            <>
              <Button
                className="cursor-pointer rounded-4xl p-5 bg-gray-200"
                variant={"outline"}
              >
                <Link to={"/signin"}>Đăng nhập</Link>
              </Button>
              <Button className="cursor-pointer text-white rounded-4xl p-5">
                <Link to={"/signup"}>Đăng ký tài khoản</Link>
              </Button>
            </>
          ) : (
            // <Button className="cursor-pointer text-white rounded-4xl p-2 px-3 text-sm">
            //   <Link to={"/signin"}>Đăng nhập</Link>
            // </Button>
            ""
          )}
        </div>
      </div>
      <div className="mt-20" id="home">
        <FileExtensionMarquee extensions={fileExtensions} speed={40} />
      </div>
    </>
  );
};

export default Header;
