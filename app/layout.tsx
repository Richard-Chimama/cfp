'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "./_styleRegistry";
import styled from 'styled-components'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const Header = styled.div`
 background-color: cyan;
 color:blue;
 height: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header>
         <h1>Community Feed</h1>
        </Header>
        {children}
      </body>
      </StyledComponentsRegistry>
    </html>
  );
}
