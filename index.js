import 'normalize.css'
import styles from './index.scss'
import fx from 'money'

document.addEventListener('DOMContentLoaded', function (e) {
  const firstInput = document.getElementById('first-value-input')
  const secondInput = document.getElementById('second-value-input')
  const firstSelect = document.getElementById('first-select')
  const secondSelect = document.getElementById('second-select')

  fetch('https://api.fixer.io/latest?base=BGN&symbols=RUB,USD,EUR,GBP,CNY,HUF')
    .then((resp) => resp.json())
    .then((data) => fx.rates = data.rates)
    .then(() => {
      setTimeout(function () {
        const money = 1
        const exchangedMoney = exchangeMoney(money)
        firstInput.value = money
        secondInput.value = exchangedMoney
        firstInput.focus()
      }, 1000);
    })

  const exchangeMoney = (amount, isReverse) => {
    const firstCurrency = firstSelect
      .options[firstSelect.selectedIndex].value
    const secondCurrency = secondSelect
      .options[secondSelect.selectedIndex].value
    if (isReverse) {
      const result = fx(Number(amount)).from(secondCurrency).to(firstCurrency)
      return Number(result).toFixed(2)
    }
    const result = fx(Number(amount)).from(firstCurrency).to(secondCurrency)
    return Number(result).toFixed(2)
  }

  firstInput.addEventListener('input', (e) => {
    const newExchangedValue = exchangeMoney(e.target.value)
    secondInput.value = newExchangedValue
  })

  secondInput.addEventListener('input', (e) => {
    const newExchangedValue = exchangeMoney(e.target.value)
    firstInput.value = newExchangedValue
  })

  firstSelect.onchange = function () {
    secondInput.value = exchangeMoney(firstInput.value)
  }

  secondSelect.onchange = function () {
    firstInput.value = exchangeMoney(secondInput.value, true)
  }
})
