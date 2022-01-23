import Head from 'next/head'
import Script from 'next/script'

import '../public/styles/global.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.onload = function() {
              if (navigator.userAgent.match(/inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\\/[^1]/i)) {
                document.body.innerHTML = '';
  
                if (navigator.userAgent.match(/iPhone|iPad/i)) {
                  location.href='ftp://wedding220301.com/bridge.html?_targeturl='+location.href;
                } else {
                  location.href='intent://'+location.href.replace(/https?:\\/\\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
                }
              }
            }
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
