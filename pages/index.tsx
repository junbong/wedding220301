import { useEffect, useState, useRef, useCallback, CSSProperties } from 'react'
import Head from 'next/head'
import { useResizeDetector } from 'react-resize-detector'

import { SCROLL_HEIGHT } from '../constants'
import SceneOne from '../scenes/SceneOne'
import SceneTwo from '../scenes/SceneTwo'
import SceneThree from '../scenes/SceneThree'
import SceneFour from '../scenes/SceneFour'

export default function Home() {
  const { ref: scrollContainerRef, width, height } = useResizeDetector()

  const containerRef = useRef<HTMLDivElement>()
  const [scrollY, setScrollY] = useState<number>(0)
  const [containerStyle, setContainerStyle] = useState<CSSProperties>()

  useEffect(function attachWindowScrollEventListener() {
    function handleScrollWindow() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScrollWindow)

    return function cleanup() {
      window.removeEventListener('scroll', handleScrollWindow)
    }
  }, [])

  const handleSetStyle = useCallback((style: CSSProperties) => {
    setContainerStyle(style)
  }, [])

  return (
    <div
      ref={containerRef}
      className="container"
    >
      <Head>
        <title>Wedding Invitation</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a03f9d9e75edf1acc768186daa32169b"></script>

        <meta property="og:title" content="전봉 ❤ 다은 결혼합니다" key="title" />
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
        style={containerStyle}
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
            onSetStyle={handleSetStyle}
          />

          <SceneTwo
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={containerRef.current?.clientHeight}
            onSetStyle={handleSetStyle}
          />

          <SceneThree
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={containerRef.current?.clientHeight}
            onSetStyle={handleSetStyle}
          />

          <SceneFour
            wrapperWidth={width}
            wrapperHeight={height}
            currentScroll={scrollY}
            sceneHeight={containerRef.current?.clientHeight}
            onSetStyle={handleSetStyle}
          />
        </main>
      </div>

      <footer>
        <h1>그랜드힐 컨벤션 3층 그랜드볼룸</h1>
        <h2>서울 강남구 역삼로 607</h2>
        <h2>02-6964-7889</h2> <br />
        <h3>Created by Junbong</h3>
      </footer>
    </div>
  )
}
