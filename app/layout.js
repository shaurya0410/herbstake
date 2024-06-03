import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import "../app/Home.css";
import Script from "next/script";
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
              <Link href={"/stake"}>STAKE</Link>
            </li>
            <li>
              <Link href={"/tokenomics"}>TOKENOMICS</Link>
            </li>
            <li>
              <Link href={"/richlist"}>RICHLIST</Link>
            </li>
          </ul>
            {/* <i className="fa-solid fa-xmark nav-close"></i>
          <i className="fa-solid fa-bars nav-open"></i> */}
        </nav>
        {children}
        <footer>
          <p>Copyright 2023 naturestoken. All Rights Reserved.</p>
        </footer>
      <Script
        src="https://kit.fontawesome.com/7781a5fc07.js"
        crossorigin="anonymous"
      ></Script>
      </body>
    </html>
  );
}
