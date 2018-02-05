import 'normalize.css'
import styles from './index.scss'
import fx from 'money'

fetch('https://api.fixer.io/latest')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)

const currencyList = {
  ruble: {
    name: 'Рубли',
    code: 'RUB'
  },
  dollar: {
    name: 'Доллары',
    code: 'USD'
  },
  euro: {
    name: 'Евро',
    code: 'EUR'
  },
  pound: {
    name: 'Фунты',
    code: 'GBP'
  },
  yuan: {
    name: 'Юани',
    code: 'CNY'
  },
  forint: {
    name: 'Форинты',
    code: 'HUF'
  },
  grivna: {
    name: 'Гривны',
    code: 'UAH'
  }
}

let currency = {
  start: currencyList.ruble.code,
  final: currencyList.dollar.code
}

document.addEventListener('DOMContentLoaded', function (e) {
  const startInput = document.getElementById('start-value-input')
  const finalInput = document.getElementById('final-value-input')

  startInput.addEventListener('input', function (e) {
    const result = fx(this.value).from(currency.start).to(currency.final)
    finalInput.value = Number(result).toFixed(2)
  })

  finalInput.addEventListener('input', function (e) {
    const result = fx(this.value).from(currency.final).to(currency.start)
    startInput.value = Number(result).toFixed(2)
  })
})
