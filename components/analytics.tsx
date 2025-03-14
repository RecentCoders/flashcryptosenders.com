"use client"

import Script from "next/script"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views when the pathname changes
    if (pathname && window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
        page_search: searchParams ? searchParams.toString() : "",
        page_title: document.title,
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PKCRM67D');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PKCRM67D"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager */}

      {/* Vercel Web Analytics */}
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />

      {/* Vercel Speed Insights */}
      <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />

      {/* Ahrefs Analytics */}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="OaXOwTnidhU6eObgFQmqlA"
        strategy="afterInteractive"
      />
      {/* End Ahrefs Analytics */}
    </>
  )
}

