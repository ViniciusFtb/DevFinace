const save = document.getElementById('save');
const ul = document.getElementById('transactionsWrapper');

//FINANCES
function generateFinances(money = 0){
    let totalMoney = localStorage.getItem('totalMoney');
    totalMoney = JSON.parse(totalMoney);

    if (totalMoney !== null){
        totalMoney = parseFloat(totalMoney);
        totalMoney += parseFloat(money);
        totalMoney = JSON.stringify(totalMoney);
        localStorage.setItem('totalMoney', totalMoney);
        updateTotalHtml();
    }else{
        totalMoney = parseFloat(money);
        totalMoney = JSON.stringify(totalMoney);
        localStorage.setItem('totalMoney', totalMoney);
        updateTotalHtml();
    } 
}

function removeFinances(money){
    let totalMoney = localStorage.getItem('totalMoney');
    totalMoney = JSON.parse(totalMoney);
    totalMoney -= parseFloat(money);
    totalMoney = JSON.stringify(totalMoney);
    localStorage.setItem('totalMoney', totalMoney);
    updateTotalHtml();
}

function updateTotalHtml(){
    let moneyHtml = document.getElementById('total');
    let totalMoney = localStorage.getItem('totalMoney');

    if (totalMoney != null){
        console.log(totalMoney);
        if (totalMoney < 0){
            moneyHtml.innerHTML = "-" + correctNumber(totalMoney);
        }else{
            moneyHtml.innerHTML = correctNumber(totalMoney);
        }
    }else{
        moneyHtml.innerHTML = "0,00";
    }
}
window.addEventListener('load', updateTotalHtml());


//CREATING TRANSACTION
function clearInputField(){
    document.getElementById('description').value = '';
    document.getElementById('purchase').value = '';
    document.getElementById('date').value = '';
}

function correctNumber(num){
    let correctNum = num;

    if (correctNum == ''){
        correctNum = '0';
    }

    if (correctNum.includes('-')){
        correctNum = correctNum.replace('-', '');
    }

    if (!correctNum.includes('.')){
        correctNum += ',00' 
    } else{
        correctNum = correctNum.replace('.', ',');
    }
    
    return correctNum;
}

function getSign(num){
    if(num < 0){
        return '-';
    }else{
        return '';
    }
}

function getMoneyColor(num){
    if(num < 0){
        return 'negative';
    }else{
        return 'positive';
    }
}

function createTransaction(id, remove = 0, updateTotal = 0){ 
    let storaged = localStorage.getItem(id);
    storaged = JSON.parse(storaged)

    if(storaged !== null){

        if (updateTotal == 1){
            updateTotalHtml();
        }else{
            console.log('generate');
            generateFinances(storaged[1]);
        }

        ul.innerHTML += `
            <li id="${id}" >
            <p>${storaged[0]}</p>
            <p class="money ${getMoneyColor(storaged[1])}">
            ${getSign(storaged[1])}R$ ${correctNumber(storaged[1])}
            </p>
            <p class="date">${storaged[2]}</p>
            <img src="./images/minus-sign.svg" alt="Minus sign" class="remove-transaction" onclick="removeTransaction(event)" id="${id}">
            </li>
        `;
    }
    
    clearInputField();
}

//REMOVING TRANSACTION
function removeTransaction(event){
    event.target.parentElement.style.display = 'none';
    let id = event.target.id

    let storaged = localStorage.getItem(id);
    storaged = JSON.parse(storaged)
    removeFinances(storaged[1]);

    localStorage.removeItem(id);
}


//STORING TRANSACTION
function correctDate(dt){
    function monthToNumber(month){
        let number;
        if (month == 'Jan'){
            number = '01'
        }else if (month =='Feb'){
            number = '02'
        }else if (month == 'Mar'){
            number = '03'
        }else if (month == 'Apr'){
            number = '04'
        }else if (month == 'May'){
            number = '05'
        }else if (month == 'Jun'){
            number = '06'
        }else if (month == 'Jul'){
            number = '07'
        }else if (month == 'Aug'){
            number = '08'
        }else if (month == 'Sep'){
            number = '09'
        }else if (month == 'Oct'){
            number = '10'
        }else if (month == 'Nov'){
            number = '11'
        }else if (month == 'Dec'){
            number = '12'
        }
        return number;
    }

    let correctedDate;
    if(!dt.includes('-')){
        correctedDate = new Date();
        dateArray = correctedDate.toString().split(' ');
        correctedDate = `${dateArray[2]}/${monthToNumber(dateArray[1])}/${dateArray[3]}`
    }else{
        correctedDate = dt.split('-');
        correctedDate = `${correctedDate[2]}/${correctedDate[1]}/${correctedDate[0]}`
    }
    
    return correctedDate;
}

function storeTransaction(){
    let description = document.getElementById('description').value;
    let purchase = document.getElementById('purchase').value;
    let date = document.getElementById('date').value;
    date = correctDate(date);

    let index = localStorage.getItem('index');
    index = JSON.parse(index);
    if(index == null){
        let trArray = [description, purchase, date];
        trArray = JSON.stringify(trArray);
        index = 0
        localStorage.setItem(index, trArray);
        createTransaction(index, 0, 0)
        index = JSON.stringify(index);
        localStorage.setItem('index', index)
    }else{
        let trArray = [description, purchase, date];
        trArray = JSON.stringify(trArray);
        index++
        localStorage.setItem(index, trArray);
        createTransaction(index, 0, 0)
        index = JSON.stringify(index);
        localStorage.setItem('index', index)
    }

    let totalTransactions = localStorage.getItem('total');
    if (totalTransactions == '1' || totalTransactions != null){
        totalTransactions = JSON.parse(totalTransactions);
        totalTransactions++; 
        totalTransactions = JSON.stringify(totalTransactions);
        localStorage.setItem('total', totalTransactions);
    }else if(totalTransactions == null){
        totalTransactions = JSON.parse(totalTransactions);
        totalTransactions = 1;
        totalTransactions = JSON.stringify(totalTransactions);
        localStorage.setItem('total', totalTransactions);
    }
}

save.addEventListener('click', storeTransaction);


//CHECKING STORAGE
function checkStorageData(){
    let storageTotalLength = localStorage.getItem('total');
    storageTotalLength = JSON.parse(storageTotalLength);

    if(storageTotalLength > 0){
        for(let i = 0; i <= storageTotalLength; i++){
            createTransaction(i, 0, 1);
        }
    }
}

window.addEventListener('load', checkStorageData);
