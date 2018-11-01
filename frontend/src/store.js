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
    ]
  }
})
