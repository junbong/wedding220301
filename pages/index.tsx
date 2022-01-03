import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import { useResizeDetector } from 'react-resize-detector'

import { SCROLL_HEIGHT } from '../constants'
import SceneOne from '../scenes/SceneOne'
import SceneTwo from '../scenes/SceneTwo'

export default function Home() {
  const { ref: scrollContainerRef, width, height } = useResizeDetector()

  const containerRef = useRef<HTMLDivElement>()
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(function attachWindowScrollEventListener() {
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
      ref={containerRef}
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

      <div
        ref={scrollContainerRef}
        className="scrollContainer"
      >
        <main
          style={{
            height: `${SCROLL_HEIGHT}vh`,
          }}
        >
          <SceneOne
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={containerRef.current?.clientHeight}
          />

          <SceneTwo
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={containerRef.current?.clientHeight}
          />
        </main>
      </div>

      <footer>
        Created by Junbong
      </footer>
    </div>
  )
}
