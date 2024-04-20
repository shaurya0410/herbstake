import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import "../app/Home.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HERB staking",
  description: "herb work for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <div id="logo">
            <img src="HERB.png" alt="herb" />
          </div>
          <ul>
            <li>
              <Link href={"/"}>HOME</Link>
            </li>
            <li>
              <a href="/#section-4">COMMANDS</a>
            </li>
            <li>
              <Link href={"/stake"}>STAKE</Link>
            </li>
          </ul>
        </nav>
        {children}
        <footer>
          <p>Copyright 2023 naturestoken. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
