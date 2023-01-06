let run;

let maxLitersOfFirstJug = 0;
let maxLitersOfSecondJug = 0;
let requiredLiters = 0;

let oneLiterInProcentFirst;
let oneLiterInProcentSecond;

let divOfWaterInFirstJug;
let divOfWaterInSecondJug;
let litersOfFirstJug = 0;
let litersOfSecondJug = 0;

let divOfFirstJug = document.getElementById('firstJug');
let divOfSecondJug = document.getElementById('secondJug');

const impossible = "Impossible conditions";

//ПРОВЕРКИ
class Checking {

    firstCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug) {
        if (maxLitersOfFirstJug == 0 || maxLitersOfSecondJug == 0) {
            return false;
        } else {
            return true;
        }
    }

    secondCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug, requiredLiters) {
        if ((requiredLiters > maxLitersOfFirstJug && requiredLiters > maxLitersOfSecondJug)) {
            return "err3";
        }

        if ((requiredLiters < 0 || maxLitersOfFirstJug < 0 || maxLitersOfSecondJug < 0)) {
            return "err4"
        }

        if (maxLitersOfFirstJug == maxLitersOfSecondJug && maxLitersOfFirstJug != requiredLiters) {
            return "err5";
        }
    }
}

let check = new Checking();

function Starting() {

    if (!check.firstCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug)) {
        alert('You need to enter volume of jugs!');
        return;
    }

    oneLiterInProcentFirst = 100/maxLitersOfFirstJug;
    oneLiterInProcentSecond = 100/maxLitersOfSecondJug;

    divOfWaterInFirstJug = document.getElementById('waterOfFirstJug');
    divOfWaterInSecondJug = document.getElementById('waterOfSecondJug');
    litersOfFirstJug = 0;
    litersOfSecondJug = 0;

    Gap();

    if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
        findedIn();
        clearInterval(run);
    }
}

function Gap() {
    
    if (litersOfFirstJug == maxLitersOfFirstJug) {
        litersOfFirstJug = 0;
        if (litersOfSecondJug == 0) {
            alert(impossible);
            clearInterval(run);
            return;
        }
    }
    litersOfSecondJug = litersOfSecondJug+maxLitersOfSecondJug;
    printWater();
    printInJugs();
}

function main() {

    if (litersOfFirstJug == maxLitersOfFirstJug) {
        litersOfFirstJug = 0;
        if (litersOfSecondJug == 0) {
            alert(impossible);
            clearInterval(run);
            return;
        }
    }

    if (litersOfFirstJug + litersOfSecondJug > maxLitersOfFirstJug) {
        litersOfSecondJug = litersOfSecondJug - (maxLitersOfFirstJug - litersOfFirstJug);
        litersOfFirstJug = litersOfFirstJug +(maxLitersOfFirstJug-litersOfFirstJug);
        printWater();
        printInJugs();
        if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
            findedIn();
            clearInterval(run);
        }

    } else {
        litersOfFirstJug = litersOfFirstJug + litersOfSecondJug;
        litersOfSecondJug = 0;
        printWater();
        printInJugs();
        
        if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
            findedIn();
            clearInterval(run);
            return;
        }

        setTimeout(Gap, 1000);
        if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
            findedIn();
            clearInterval(run);
        }
    }
}

function printWater() {

    if (litersOfFirstJug !== 0) { 
        divOfWaterInFirstJug.style.backgroundColor = 'blue';
    }

    if (litersOfSecondJug !== 0) { 
        divOfWaterInSecondJug.style.backgroundColor = 'blue';
    }

    divOfWaterInFirstJug.style.height = `${litersOfFirstJug * oneLiterInProcentFirst}%`;
    divOfWaterInSecondJug.style.height = `${litersOfSecondJug * oneLiterInProcentSecond}%`;
}

function findedIn() {
    if (litersOfFirstJug == requiredLiters) {
        setTimeout(() => {
            alert('Find in first Jug');
        }, 100); 
    } else { 
        setTimeout(() => {
            alert('Find in second Jug')
        },100);
    }
}

function printInJugs() {
    divOfWaterInFirstJug.innerHTML = litersOfFirstJug;
    divOfWaterInSecondJug.innerHTML = litersOfSecondJug;
}

//ВВОД ДО ТЕХ ПОР, ПОКА НЕ СТАНЕТ ВЕРНЫМ
function inputVolumeOfJug(text, def) {
    let flag = true;
    let liters;
    while (flag) {
        liters = prompt(text, def);
        liters = parseInt(liters);
        if (isNaN(liters)) {
            alert('You must enter a number!');
        } else {
            flag = false;
        }
    }
    return liters;
}


function preparationForWork() {
    maxLitersOfFirstJug = inputVolumeOfJug("Enter the number of liters for first jug", 5);
    maxLitersOfSecondJug = inputVolumeOfJug("Enter the number of liters for first jug", 2);
    requiredLiters = inputVolumeOfJug("Enter the number of liters you want to find", 3);  

    //ОБРАБОТКА ОШИБОК
    switch (check.secondCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug, requiredLiters)){
        case "err3":
            alert('Error!\nYou cant find more liters than there are in your jugs');
            break;
        case "err4":
            alert('Error!\nYou cant find negative liters');
            break;
        case "err5":
            alert('Error!\nYou cant find this liters');
            break;
        default:
            break;
    }

    if (maxLitersOfFirstJug < maxLitersOfSecondJug) {
        maxLitersOfFirstJug = maxLitersOfFirstJug + maxLitersOfSecondJug;
        maxLitersOfSecondJug = maxLitersOfFirstJug - maxLitersOfSecondJug;
        maxLitersOfFirstJug = maxLitersOfFirstJug - maxLitersOfSecondJug;
        alert('Ok, now first jug is second and second jug is first');
    }
    
    document.getElementById('firstJug').style.height = `100%`;
    document.getElementById('secondJug').style.height = `${100/maxLitersOfFirstJug*maxLitersOfSecondJug}%`;
}


function print_text(litersOfFirstJug, litersOfSecondJug) {
    a = alert(`First jug = ${litersOfFirstJug}\nSecond Jug = ${litersOfSecondJug}`);
    return a;
}


function clicks() {
    preparationForWork();
    setTimeout(Starting, 1000);
    run = setInterval(main, 2000);
}

document.addEventListener('DOMContentLoaded', clicks);