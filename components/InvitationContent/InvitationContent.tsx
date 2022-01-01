import styles from './InvitationContent.module.scss'

function InvitationContent() {
  return (
    <div className={styles.content}>
      <div className={styles.entry}>
        각자의 길을 열심히 걸어온 저희 두 사람<br />
        삶이라는 멋진 여행길에 함께 오르고자 합니다.<br />
        부부라는 이름으로 새로이 시작하는 날,<br />
        여행의 출발지에 귀한 걸음 해주시면<br />
        더 없는 기쁨으로 간직하겠습니다.
      </div>

      <div className={styles.heroNames}>
        <strong>이강한</strong><strong>·</strong><strong>정임선</strong> 의 장남 <strong>전봉</strong><br />
        <strong>정범석</strong><strong>·</strong><strong>김복원</strong> 의 장녀 <strong>다은</strong>
      </div>

      <div className={styles.venue}>
        2022년 3월 1일 화요일 낮 12시<br />
        그랜드힐 컨벤션 3F 그랜드볼룸
      </div>
    </div>
  )
}

export default InvitationContent
