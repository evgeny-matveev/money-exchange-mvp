import 'normalize.css'
import styles from './index.scss'
import fx from 'money'

fetch('https://api.fixer.io/latest?base=BGN&symbols=RUB,USD,EUR,GBP,CNY,HUF')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)

let state = {
  startInputValue: 0,
  finalInputValue: 0,
  startCurrency: 'USD',
  finalCurrency: 'RUB'
}

document.addEventListener('DOMContentLoaded', function (e) {
  const startInput = document.getElementById('start-value-input')
  const finalInput = document.getElementById('final-value-input')
  const startSelect = document.getElementById('start-select')
  const finalSelect = document.getElementById('final-select')

  startInput.addEventListener('input', function (e) {
    const { startCurrency, finalCurrency } = state
    const startInputValue = e.target.value
    const result = fx(startInputValue).from(startCurrency).to(finalCurrency)
    const finalInputValue = Number(result).toFixed(2)
    finalInput.value = finalInputValue
    state.startInputValue = startInputValue
    state.finalInputValue = finalInputValue
  })

  finalInput.addEventListener('input', function (e) {
    const { startCurrency, finalCurrency } = state
    const finalInputValue = e.target.value
    const result = fx(finalInputValue).from(finalCurrency).to(startCurrency)
    const startInputValue = Number(result).toFixed(2)
    startInput.value = startInputValue
    state.startInputValue = startInputValue
    state.finalInputValue = finalInputValue
  })

  startSelect.onchange = function (e) {
    const startCurrency = e.target.value
    const { startInputValue, finalCurrency } = state
    const result = fx(startInputValue).from(startCurrency).to(finalCurrency)
    finalInput.value = Number(result).toFixed(2)
    state.startCurrency = startCurrency
  }

  finalSelect.onchange = function (e) {
    const finalCurrency = e.target.value
    const { finalInputValue, startCurrency } = state
    const result = fx(finalInputValue).from(finalCurrency).to(startCurrency)
    startInput.value = Number(result).toFixed(2)
    state.finalCurrency = finalCurrency
  }
})
