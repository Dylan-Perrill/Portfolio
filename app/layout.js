import "./globals.css";

export const metadata = {
  title: "Dylan Perrill — Portfolio",
  description: "Projects, experience, and contact info.",
  openGraph: {
    title: "Dylan Perrill — Portfolio",
    description: "Projects, experience, and contact info.",
    url: "https://your-domain.com",
    siteName: "Dylan Perrill",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
