import { ExternalLink, Mail, Github, Linkedin, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-8 mt-28" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-4 md:mb-0">
            <a
              href="/about"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href="mailto:nguyenloc.tlc@gmail.com"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Gmail</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/terms"
              className="text-sm hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm hover:text-primary transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-800 text-xs text-gray-400">
          <p>File ClipBoard</p>
          <p>
            © {new Date().getFullYear()} File Clipboard, a Your nguyenlocDev
          </p>
        </div>
      </div>
    </footer>
  );
}
