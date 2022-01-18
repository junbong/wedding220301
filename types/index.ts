import { CSSProperties } from 'react'

export interface SceneProps {
  wrapperWidth?: number
  wrapperHeight?: number
  currentScroll?: number
  sceneHeight?: number
  onSetStyle?: (style: CSSProperties) => void
}
