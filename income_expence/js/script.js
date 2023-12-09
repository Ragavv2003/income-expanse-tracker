const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

const trans = document.querySelector("#trans");     //ledger
const form = document.querySelector("#form");
/*
const dummyData = [
    {id: 1, description: "Flower", amount: -20 },
    {id: 2, description: "Salary", amount: 35000 },
    {id: 3, description: "Book", amount: -10 },
    {id: 4, description: "Camara", amount: -150 },
    {id: 5, description: "Petrol", amount: -250 },
];

let transctions = dummyData;
*/
const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transctions = localStorage.getItem("trans")!==null ? localStorageTrans : [] ;


function loadTransctionDetails(transction) {
    const sign = transction.amount < 0 ? " - " : " + ";
    const item = document.createElement("li");
    item.classList.add(transction.amount < 0 ? "exp" : "inc");
    trans.appendChild(item);
    item.innerHTML = `
         ${transction.description}
         <span> ${sign}  ${Math.abs(transction.amount)}</span>
         <button class="btn-del" onclick = "reomveTrans(${transction.id})">x</button>
         `;
         // console.log(item);
    
}

function reomveTrans(id) {
    if(confirm("Are you sure you want to delete the Transction?")) 
    {
        transctions = transctions.filter((transction)=>
        transction.id != id);                           //**** */
        config();   
        updateLocalStorage()
    }
    else {
        return;
    }
    // console.log(id)
}

function updateAmount () {
    const amounts = transctions.map ((transction) =>
    transction.amount
    );
    // console.log(amounts);
    const total = amounts.reduce((acc,item)=>(acc += item), 0).toFixed(2);         //.toFixes for .00 convert array value into single value//
    balance.innerHTML = `₹ ${total}`;

    const income = amounts.filter((item) => item > 0)
    .reduce((acc,item) => (acc += item),0)
    .toFixed(2);
    console.log(income);
    inc_amt.innerHTML = `₹ ${income}`;

    const outgoing = amounts.filter((item) => item < 0)
    .reduce((acc,item) => (acc += item),0)
    .toFixed(2);
    console.log(outgoing);
    exp_amt.innerHTML = `₹ ${Math.abs(outgoing)}`;
}

function  config() {
    trans.innerHTML = "";               //delete the html li's
    transctions.forEach(loadTransctionDetails)   //TRANSCTION > (LTD) > LTD > TRANSCTION
    updateAmount();                              //refresh and after deleted
}


function addTransction(e) {
    e.preventDefault();                 // preventing the url
    if(description.value.trim() == "" || amount.value.trim() == "")
    {
        alert("Please Enter the Description and Amount ");
    }
    else
    {
        const transction = {
            id: uniqueId(),
            description: description.value,
            amount: +amount.value       //+ is conver obj into int
        };
        transctions.push(transction);
        loadTransctionDetails(transction);      //for appending the list
        description.value = "";
        amount.value = "";
        updateAmount();
        updateLocalStorage()
    }
}

function uniqueId() {
    return Math.floor(Math.random() * 10000000);
}

form.addEventListener("submit",addTransction);




window.addEventListener("load", function() {            //*** *
    config();
});


function updateLocalStorage(){
    localStorage.setItem("trans", JSON.stringify(transctions));
}