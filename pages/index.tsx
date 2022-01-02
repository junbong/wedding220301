import { useEffect, useCallback, useState } from 'react'
import Head from 'next/head'
import { useResizeDetector } from 'react-resize-detector'

import SceneOne from '../scenes/SceneOne/SceneOne'

export default function Home() {
  const { ref, width, height } = useResizeDetector()

  const [scrollY, setScrollY] = useState<number>(0)

  const handleScrollContainer = useCallback(() => {
    //
  }, [])

  useEffect(() => {
    function handleScrollWindow() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScrollWindow)

    return function cleanup() {
      window.removeEventListener('scroll', handleScrollWindow)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="container"
    >
      <Head>
        <title>Wedding Invitation</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="Wedding Invitation | 2022년 3월 1일" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://wedding220301.com" />
        <meta property="og:description" content="2022년 3월 1일 화요일 낮 12시, 그랜드힐 컨벤션 3F 그랜드볼룸" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content="http://wedding220301.com/images/og_image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Wedding Invitation - 2022/03/01" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
      </Head>

      <main>
        <SceneOne
          wrapperWidth={width}
          wrapperHeight={height}
          currentScroll={scrollY}
        />
      </main>

      <footer>
        Created by Junbong
      </footer>
    </div>
  )
}
