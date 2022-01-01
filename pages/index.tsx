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
