import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Louisten Manalu | Front-end Software Engineer",
        template: "%s | Louisten Manalu",
    },
    description: "Front-end Software Engineer with 5 years of experience in React JS & Next JS. Specializing in building modern, scalable web applications.",
    keywords: ["Front-end Developer", "React", "Next.js", "TypeScript", "JavaScript", "Web Development", "Software Engineer"],
    authors: [{ name: "Louisten Manalu" }],
    creator: "Louisten Manalu",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://louisten-manalu-portfolio.vercel.app",
        siteName: "Louisten Manalu Portfolio",
        title: "Louisten Manalu | Front-end Software Engineer",
        description: "Front-end Software Engineer with 5 years of experience in React JS & Next JS.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Louisten Manalu Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Louisten Manalu | Front-end Software Engineer",
        description: "Front-end Software Engineer with 5 years of experience in React JS & Next JS.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
