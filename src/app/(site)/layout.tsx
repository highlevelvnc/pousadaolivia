import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import Reveal from "@/components/site/Reveal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <WhatsAppFab />
      <Reveal />
    </>
  );
}
