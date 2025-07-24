const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    convertCurrency();
});

const convertCurrency = async () => {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (amount === "" || fromCurrency === "" || toCurrency === "") {
        resultDiv.innerHTML = "Please fill in all fields.";
        return;
    }

    const response = await fetch(`${API_URL}${fromCurrency}`);
    const data = await response.json();
    if (data.error) {
        resultDiv.innerHTML = "Error fetching exchange rates.";
        return;
    }

    const exchangeRate = data.rates[toCurrency];
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}