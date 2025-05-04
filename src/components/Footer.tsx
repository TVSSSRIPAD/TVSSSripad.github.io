
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Sripad. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/TVSSSRIPAD"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/__sripad"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/sripad-t-v-s-s"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
