import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kazi up",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`bg-white fixed left-0 top-0 z-50 w-full h-screen`}
    >
      <div className="px-28 h-[60px] flex justify-start items-center text-3xl">KaziUp admin</div>

      {children}
    </div>
  );
}
