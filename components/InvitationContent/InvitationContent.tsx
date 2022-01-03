import styles from './InvitationContent.module.scss'

function InvitationContent() {
  return (
    <div className={styles.content}>
      <div className={styles.heroesWrapper}>
        <div className={styles.heroes}>
          <span>이전봉</span>
          <strong>03 / 01</strong>
          <span>정다은</span>
        </div>
      </div>

      <div className={styles.entry}>
        각자의 길을 열심히 걸어온 저희 두 사람<br />
        삶이라는 멋진 여행길에 함께 오르고자 합니다.<br />
        부부라는 이름으로 새로이 시작하는 날,<br />
        여행의 출발지에 귀한 걸음 해주시면<br />
        더 없는 기쁨으로 간직하겠습니다.
      </div>
    </div>
  )
}

export default InvitationContent
