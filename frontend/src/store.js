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
    ]
  }
})
