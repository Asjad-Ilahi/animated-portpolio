import Image from "next/image"
import { Link } from "../../utils/Link"
import { MobileMenuButton } from "./MobileMenuButton"
import { MobileMenuProvider, MobileNavBackdrop, MobileNavPanel } from "./MobileMenu"
import { SITE_NAV_LINKS, SITE_SLUGS } from "@/config/siteConfig"

const navItems = SITE_NAV_LINKS

export const TopBarV2: React.FC = () => {
  return (
    <MobileMenuProvider>
      <nav className="font-sans isolate fixed top-1 left-1/2 z-[200] flex w-[calc(100vw-1.25rem)] max-w-xl -translate-x-1/2 justify-center text-base sm:top-2.5 sm:w-fit sm:max-w-none md:top-5 md:text-sm">
        <div className="relative z-10 flex w-full flex-col items-stretch sm:w-auto">
          <MobileNavBackdrop />
          {/* overflow-hidden only wraps the pill row so the mobile drawer is not clipped */}
          <div className="mobile-nav-pill relative z-10 overflow-hidden rounded-full border border-white/50 bg-white/55 shadow-[0_10px_30px_rgba(0,0,0,0.09)] backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ease-out">
            <div className="relative">
              <div className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-full" />
              <div className="flex items-center gap-4 px-4 py-3 md:gap-6 md:px-5 md:py-2.5">
                <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 font-semibold text-nowrap text-[#1d1d1f]">
                  <Image src="/logo.png" alt="" width={34} height={34} className="shrink-0 rounded-full border border-gray-200 object-cover" />
                  <span className="truncate">Asjad Ilahi</span>
                </Link>

                <ul className="hidden items-center gap-6 font-medium text-[#18181b] transition-all duration-250 ease-out md:flex md:scrolled-up:max-w-[32rem] md:scrolled-up:opacity-100 md:scrolled-down:pointer-events-none md:scrolled-down:max-w-0 md:scrolled-down:opacity-0">
                  {navItems.map((item) => (
                    <li key={item.name} className="flex">
                      <Link prefetch={false} href={item.href} className="bubble-hover px-1 py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li className="flex">
                    <Link
                      href={SITE_SLUGS.contact}
                      className="bubble-hover hidden rounded-full border border-gray-200 bg-white px-5 py-2 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.06)] duration-300 hover:translate-y-0.5 hover:border-white hover:shadow-none md:inline-block"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>

                <MobileMenuButton />
              </div>
            </div>
          </div>

          <MobileNavPanel navItems={Array.from(SITE_NAV_LINKS)} />
        </div>
      </nav>
    </MobileMenuProvider>
  )
}
