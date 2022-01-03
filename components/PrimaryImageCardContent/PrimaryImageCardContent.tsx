import Image from 'next/image'

import styles from './PrimaryImageCardContent.module.scss'

function PrimaryImageCardContent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftTopCorner} />
      <div className={styles.rightBottomCorner} />

      <Image
        src="/images/og_image.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  )
}

export default PrimaryImageCardContent
