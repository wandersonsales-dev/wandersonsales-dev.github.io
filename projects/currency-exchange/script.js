/* eslint-disable no-param-reassign */
const BASE_URL = 'https://api.currencyscoop.com/v1/latest';
const API_KEY = 'c2f6f5a0fc52cb65d15aee370f9ee1c4';

const currencyObj = {
  currency: {},
  base: 'USD',
};

const curClass = '#cur';
const relClass = '#rel';

const fetchAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/?base=${currencyObj.base}&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error(err);
  }
};

const getCurrency = (symbol) => currencyObj.currency.response.rates[symbol];

const initialExchange = async () => {
  const cur = document.querySelector(curClass);
  const rel = document.querySelector(relClass);
  cur.value = 1;
  rel.value = (cur.value * getCurrency('BRL')).toFixed(2);
};

const setExchangeCur = () => {
  const cur = document.querySelector(curClass).value;
  const rel = document.querySelector(relClass);
  rel.value = (cur * getCurrency('BRL')).toFixed(2);
};

const setExchangeRel = () => {
  const rel = document.querySelector(relClass).value;
  const cur = document.querySelector(curClass);
  cur.value = (rel / getCurrency('BRL')).toFixed(2);
};

const updateCurrency = async () => {
  const data = await fetchAPI();
  currencyObj.currency = data;
};

const initUpdateCurrency = async () => {
  setInterval(async () => {
    const data = await fetchAPI();
    currencyObj.currency = data;
    if (document.querySelector(curClass).value === '') initialExchange();
  }, 3000);
};

const initListener = () => {
  const cur = document.querySelector(curClass);
  cur.addEventListener('change', setExchangeCur);
  cur.addEventListener('keyup', setExchangeCur);

  const rel = document.querySelector(relClass);
  rel.addEventListener('change', setExchangeRel);
  rel.addEventListener('keyup', setExchangeRel);
};

const setCurrencyOperation = async () => {
  const symbol = document.querySelector('.flag');
  await updateCurrency();
  symbol.innerHTML = currencyObj.base;
  initialExchange();
};

const initLinks = () => {
  const links = document.querySelectorAll('.menu a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className !== 'active') {
        const l = document.querySelectorAll('.menu a');
        l.forEach((el) => { el.className = ''; });
        e.target.className = 'active';
        currencyObj.base = e.target.outerHTML.substring(e.target.outerHTML
          .indexOf('alt=') + 5).substring(0, 3);
        setCurrencyOperation();
      }
    });
  });
};

const init = async () => {
  await initUpdateCurrency();
  initListener();
  initLinks();
};

window.onload = async () => {
  await init();
};
