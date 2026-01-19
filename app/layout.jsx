import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SideCart from "@/components/SideCart";
import AgeVerification from "@/components/AgeVerification";


export const metadata = {
  title: "De Copas | Tienda de bebidas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
          <Header />
          <WhatsAppButton />
          <SideCart />
          <main>
            {children}
          </main>
          <Footer />
          <AgeVerification/>
      </body>
    </html>
  );
}
