import millify from "millify";
const exchangeRate = 104.3;

const convertToKenyaShillings = (amount) => millify(amount * exchangeRate);
const convertToKenyaShillingsAccurate = (amount) => amount * exchangeRate;

const displayAsKenyaShilling = (amount) =>
  `Kshs ${convertToKenyaShillings(amount)}`;

export default {
  convertToKenyaShillings,
  displayAsKenyaShilling,
  convertToKenyaShillingsAccurate,
};
