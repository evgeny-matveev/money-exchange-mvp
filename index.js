import 'normalize.css'
import styles from './index.scss'
import fx from 'money'

fetch('https://api.fixer.io/latest')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)

document.addEventListener('DOMContentLoaded', function (e) {
  const startInput = document.getElementById('start-value-input')
  const finalInput = document.getElementById('final-value-input')

  startInput.addEventListener('input', function (e) {
    const startValue = this.value
    const finalValue = fx(startValue).from('RUB').to('USD')
    startInput.value = startValue
    finalInput.value = Number(finalValue).toFixed(2)
  })
})
