import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    occupation: [
      {text: '관리자', value: 'administrator'},
      {text: '전문가 및 관련', value: 'expert'},
      {text: '사무', value: 'office'},
      {text: '서비스', value: 'service'},
      {text: '판매', value: 'sale'},
      {text: '농림어업', value: 'agriculture'},
      {text: '기능원 및 관련', value: 'technician'},
      {text: '장치 기계조작 및 조립', value: 'engineer'},
      {text: '학생', value: 'student'},
      {text: '전, 현직 군인', value: 'soldier'}
    ],
    familyType: [
      {text: '미혼-1인가구', value: 'single'},
      {text: '미혼-가족과 거주', value: 'family'},
      {text: '미혼-기타형태 거주', value: 'others'},
      {text: '기혼-무자녀', value: 'noChild'},
      {text: '기혼-1자녀', value: 'oneChild'},
      {text: '기혼-2자녀', value: 'twoChild'},
      {text: '기혼-3자녀 이상', value: 'manyChild'}
    ],
    interest: [
      { text: '내집마련', value: 'myHouse' },
      { text: '결혼자금', value: 'weddingMoney' },
      { text: '목돈모으기', value: 'savingMoney' },
      { text: '자기계발', value: 'selfImprovement' },
      { text: '건물구입', value: 'buildingPurchase' }
    ],
    monthlyIncome: [
      {text: '100 이하', value: 'under100'},
      {text: '100~150', value: '100To150'},
      {text: '150~200', value: '150To200'},
      {text: '200~250', value: '200To250'},
      {text: '250~300', value: '250To300'},
      {text: '300~350', value: '300To350'},
      {text: '350~400', value: '350To400'},
      {text: '400~500', value: '400To500'},
      {text: '500~600', value: '500To600'},
      {text: '600 이상', value: 'over600'}
    ],
    assets: [
      {text: '1000 이하', value: 'under1000'},
      {text: '1000~3000', value: '1000to3000'},
      {text: '3000~5000', value: '3000to5000'},
      {text: '5000~8000', value: '5000to8000'},
      {text: '8000~1억', value: '8000to1bil'},
      {text: '1억~3억', value: '1bilto3bil'},
      {text: '3억~5억', value: '3bilto5bil'},
      {text: '5억 이상', value: 'over5bil'}
    ],
    incomeManagement: [
      { text: '예/적금', value: 'saving' },
      { text: '주식', value: 'stock' },
      { text: '펀드', value: 'fund' },
      { text: '부동산', value: 'realestate' },
      { text: '기타', value: 'etc' }
    ],
    fieldItems: [
      {
        mainFieldValue: 'style',
        mainFieldName: '스타일',
        subFields: [
          {text: '패션/잡화', value: 'fashion'},
          {text: '메이크업/헤어', value: 'makeup'},
          {text: '스킨/바디', value: 'skin'}
        ]
      },
      {
        mainFieldValue: 'place',
        mainFieldName: '플레이스',
        subFields: [
          {text: '맛집', value: 'restaurant'},
          {text: '카페', value: 'cafe'},
          {text: '지역', value: 'area'},
          {text: '여행', value: 'travel'}
        ]
      },
      {
        mainFieldValue: 'culture',
        mainFieldName: '컬쳐',
        subFields: [
          {text: '영화/TV', value: 'movie'},
          {text: '음악', value: 'music'},
          {text: '도서', value: 'books'},
          {text: '공연', value: 'show'},
          {text: '스포츠/게임', value: 'sports'}
        ]
      },
      {
        mainFieldValue: 'finance',
        mainFieldName: '금융',
        subFields: [
          {text: '재태크', value: 'financialTechnology'},
          {text: '금융상품', value: 'financialProducts'},
          {text: '세금', value: 'tax'},
          {text: '부동산', value: 'realty'},
          {text: '용돈관리', value: 'pocketMoney'}
        ]
      },
      {
        mainFieldValue: 'life',
        mainFieldName: '라이프',
        subFields: [
          {text: '일상/취미', value: 'hobby'},
          {text: '리빙/인테리어', value: 'living'},
          {text: '건강', value: 'health'},
          {text: '기타', value: 'etc'}
        ]
      }
    ],
    tags: [
      '건성', '지성', '복합성', '지복합성', '수부지', '수분부족형지성', '베이스', '팩트', '파운데이션', '립스틱', '블러셔', '아이브로우',
      '스킨', '로션', '크림', '선블록', '수면팩', '마스크팩', '클레이팩', '민감성', '모공', '홍조', '여드름', '등드름', '턱드름',
      '식단조절', '다이어트식단', '몸매관리', '필라테스', '헬스', '수영', '요가', '히알루론산', '글루타치온', '수분', '미백', '진정',
      '망원동카페', '망원동맛집', '한남동카페', '한남동맛집', '한남동술집', '쭈꾸미맛집', '라멘맛집', '쭈꾸미', '라멘', '카푸치노', '아인슈페너',
      '브런치카페', '카페', '맛집', '와인바', '맥주', '펍', '바', '이자카야', '데이트코스', '데이트', '회식', '소개팅', '친구모임', '부모님모시고가기좋은곳',
      '아담한', '테라스가있는', '넓은', '혼밥하기좋은', '분위기좋은', '무드있는', '음악이좋은', '도서명', '영화명', '공연명', '프로그램명',
      '에세이', '자기계발', '로맨스', '스릴러', '코미디', '액션', '로코', '메디컬', '힐링', '달달한', '공감가는', '스토리가탄탄한',
      '혼맥하며보기좋은', '여름밤에보기좋은', '직장인공감대형성', '세상모두가날미워하는거같을때', '1억만들기', '목돈굴리기', '사회초년생재테크',
      '주식시작하기', '자산관리', '내집마련', '러블리', '놈코어룩', '페미닌', '심플',
      '반지', '목걸이', '후드티', '울스커트', '니트', '캐시미어니트', '스마트폰', '노트북', '아이폰', '서피스프로', '집꾸미기', '인테리어', '1인가구', '자취', '원룸'
    ]
  }
})
