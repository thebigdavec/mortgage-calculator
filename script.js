const applicants = []

document.getElementById('calculate').addEventListener('click', updateResults)
document.getElementById('add-applicant').addEventListener('click', addApplicant)
document
  .getElementById('remove-applicant')
  .addEventListener('click', removeApplicant)

borrowEl = document.querySelector('#borrow p')
propertyValueEl = document.querySelector('#property-value p')

class Applicant {
  constructor(id) {
    this.id = id
    this.incomeEl = document.getElementById(this.id + '-income')
    this.depositEl = document.getElementById(this.id + '-deposit')
    this.incomeEl.addEventListener('change', updateResults)
    this.depositEl.addEventListener('change', updateResults)
  }
  get income() {
    const value = parseFloat(this.incomeEl.value)
    if (!this.isANumber(value)) return 0
    return value
  }
  get deposit() {
    const value = parseFloat(this.depositEl.value)
    if (!this.isANumber(value)) return 0
    return value
  }
  set income(value) {
    this.incomeEl.value = value
  }
  set deposit(value) {
    this.depositEl.value = value
  }
  isANumber(value) {
    return !isNaN(value) && typeof value === 'number'
  }
}

addApplicant(true)

function updateResults() {
  let incomeSum = 0
  let depositSum = 0
  for (let applicant of applicants) {
    incomeSum += applicant.income
    depositSum += applicant.deposit
  }
  const borrowable = incomeSum * 4
  const propertyValue = borrowable + depositSum

  console.log()

  borrowEl.textContent = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(borrowable)
  propertyValueEl.textContent = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(propertyValue)
}

function addApplicant(shouldBeFocus) {
  const id = 'applicant' + (applicants.length + 1)
  const applicantDiv = document.createElement('div')
  applicantDiv.id = id
  const header = document.createElement('h3')
  header.textContent = 'Applicant ' + (applicants.length + 1)
  const formEl = document.createElement('form')
  const group1 = document.createElement('div')
  group1.className = 'form-group'
  const group2 = document.createElement('div')
  group2.className = 'form-group'
  const label1 = document.createElement('label')
  label1.setAttribute('for', id + '-income')
  label1.textContent = 'Annual Gross Income'
  const input1 = document.createElement('input')
  input1.type = 'number'
  input1.id = id + '-income'
  input1.placeholder = '£'
  const label2 = document.createElement('label')
  label2.setAttribute('for', id + '-deposit')
  label2.textContent = 'Deposit'
  const input2 = document.createElement('input')
  input2.type = 'number'
  input2.id = id + '-deposit'
  input2.placeholder = '£'
  group1.appendChild(label1)
  group1.appendChild(input1)
  group2.appendChild(label2)
  group2.appendChild(input2)
  formEl.appendChild(group1)
  formEl.appendChild(group2)
  applicantDiv.appendChild(header)
  applicantDiv.appendChild(formEl)
  document.getElementById('applicants').appendChild(applicantDiv)
  if (shouldBeFocus) {
    input1.focus()
  }

  applicants.push(new Applicant(id))

  if (applicants.length > 1) {
    document.getElementById('remove-applicant').removeAttribute('hidden')
  }
}

function removeApplicant() {
  if (applicants.length < 2) return
  document.getElementById('applicant' + applicants.length).remove()
  applicants.pop()
  updateResults()
  if (applicants.length === 1)
    document.getElementById('remove-applicant').setAttribute('hidden', true)
}
