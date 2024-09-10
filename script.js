const billInput = document.getElementById("bill");
const countInput = document.getElementById("count");
const customInput = document.getElementById("custom");
const btns = document.querySelectorAll(".percent");
const resetBtn = document.getElementById("reset");

const errorMessagebill = document.getElementById("error-message-bill");
const errorMessagecount = document.getElementById("error-message-count");
const tipResult = document.getElementById("tip-amount");
const totalResut = document.getElementById("total");

let tipAmountPerperson = 0, total = 0, percent = 0;
let bill = 0, count = 0;

const calculateTip = (bill = Number(billInput.value), count = Number(countInput.value), percentage = Number(percent)) => {
    handleError();

    let tipAmount = bill * (percentage / 100);
    tipAmountPerperson = tipAmount / count;

    total = (bill / count) + tipAmountPerperson;

    tipResult.innerHTML = `\$${tipAmountPerperson.toFixed(2)}`;
    totalResut.innerHTML = `\$${total.toFixed(2)}`;
    resetBtn.disabled = false;
}

const handleError = () => {
    errorMessagebill.style.display = "none";
    billInput.classList.remove("error");

    errorMessagecount.style.display = "none";
    countInput.classList.remove("error");
}

const handleSelectedBtn = () => {
    const selectedBtn = document.querySelector(".selected");
    selectedBtn?.classList.remove("selected");
}

const handleBtn = (e) => {
    if (!billInput.value){
        errorMessagebill.style.display = "block";
        billInput.classList.add("error");
    }
    else if (!countInput.value){
        errorMessagecount.style.display = "block";
        countInput.classList.add("error");
    }
    else{
        handleSelectedBtn();
        e.target.classList.add("selected");
        percent = parseInt(e.target.innerHTML);
        calculateTip();
    }
}

customInput.addEventListener("input", (e) => {
    percent = e.target.value;
    calculateTip();
});

btns.forEach(btn => {
    btn.addEventListener("click", handleBtn);
});

resetBtn.addEventListener("click", (e) => {
    billInput.value = "";
    countInput.value = "";
    customInput.value = "";
    tipResult.innerHTML = "$0.00";
    totalResut.innerHTML = "$0.00";
    handleSelectedBtn();
    e.target.disabled = true;
});