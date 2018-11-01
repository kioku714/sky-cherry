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
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 }
    ],
    monthlyIncome: [
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 },
      { text: '관리자', value: 0 }
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
