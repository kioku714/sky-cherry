import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    occupation: [
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 }
    ],
    famailyType: [
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 }
    ],
    interest: [
      { text: '내집마련', value: 'myHouse' },
      { text: '결혼자금', value: 'weddingMoney' },
      { text: '목돈모으기', value: 'savingMoney' },
      { text: '자기계발', value: 'selfImprovement' },
      { text: '건물구입', value: 'buildingPurchase' }
    ],
    monthlyIncome: [
      { text: '내집마련', value: 'myHouse' },
      { text: '결혼자금', value: 'weddingMoney' },
      { text: '목돈모으기', value: 'savingMoney' },
      { text: '자기계발', value: 'selfImprovement' },
      { text: '건물구입', value: 'buildingPurchase' }
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
