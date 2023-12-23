import "@styles/globals.scss";
import { ConditionalNavbar, ReduxProvider } from "@components/clients";
import Footer from "@components/Footer";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Eazy Shopping",
  description: "Buy and sell products easily from anywhere anytime",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("EazyShopping");
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <div className="flex flex-col gap-3">
            <ConditionalNavbar cookie={cookieValue} />
            {children}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
