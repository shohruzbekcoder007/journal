import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { translations, type Language } from "@/lib/translations"
import Link from "next/link"
import { MessengerList } from "@/components/messenger-list"
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTelegramPlane, FaYoutube } from "react-icons/fa";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SciPublish",
  description: "A comprehensive platform for research teams to publish and collaborate",
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: Language }
}) {
  const t = translations[lang]

  return (
    // <html lang={lang} suppressHydrationWarning>
    <div className={inter.className}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Header lang={lang} submitText={t?.common?.submitPaper} phoneNumber={("+998 (99) 684-2563")} />

          <main className="flex-1">{children}</main>

          {/* Messenger List */}
          <MessengerList />

          <footer className="mt-auto border-t bg-primary text-primary-foreground">
            <div className="container py-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* About & Social Media */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">SciPublish</h3>
                  <p className="text-sm text-primary-foreground/90">
                    A comprehensive platform for research teams to publish, collaborate, and advance scientific knowledge.
                  </p>
                  <div className="flex items-center space-x-3 pt-2">
                    <Link
                      href="#"
                      aria-label="Instagram"
                      className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <FaInstagram size={20} />
                    </Link>
                    <Link
                      href="#"
                      aria-label="Facebook"
                      className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <FaFacebook size={20} />
                    </Link>
                    <Link
                      href="#"
                      aria-label="Youtube"
                      className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <FaYoutube size={20} />
                    </Link>
                    <Link
                      href="#"
                      aria-label="Telegram"
                      className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <FaTelegramPlane size={20} />
                    </Link>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href={`/${lang}/articles`}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        {t?.navigation?.articles}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${lang}/journals`}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        {t?.navigation?.journals}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${lang}/authors`}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        {t?.navigation?.authors}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${lang}/resources`}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        {t?.navigation?.resources}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Us</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <FaMapMarkerAlt className="mr-2 mt-1 h-4 w-4 shrink-0 text-primary-foreground/90" />
                      <span className="text-primary-foreground/90">
                        123 Science Avenue, Research Park, Academic City, 10001
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FaPhone className="mr-2 h-4 w-4 shrink-0 text-primary-foreground/90" />
                      <a
                        href={`tel:${t?.common?.phoneNumber.replace(/\s+/g, "")}`}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        {t?.common?.phoneNumber}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FaEnvelope className="mr-2 h-4 w-4 shrink-0 text-primary-foreground/90" />
                      <a
                        href="mailto:info@scipublish.com"
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                      >
                        info@scipublish.com
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Map */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Find Us</h3>
                  <div className="h-48 w-full overflow-hidden rounded-md border border-primary-foreground/20">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.2922926156744225!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647213989449!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                      className="grayscale filter hover:grayscale-0 transition-all duration-300"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/90">
                {t?.common?.footer}
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </div>
    // </html>
  )
}

