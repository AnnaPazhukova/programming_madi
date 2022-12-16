// Константы//
const infinity_str = "Бесконечность";
let last_action;
//берем новую цифру  и старое число что уже было введено и прибавляем их друг к другу
function input_numbers(id) {
    if (typeof id == 'object') {
        id = this.id;
    }
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    let output_number =  document.getElementById('output_field').value;
    

    if (old_number.includes(".") && new_number == ".") {
        return;
    }

    // Проверяем строку вывода на пустоту
    if (!output_number) {
        // Проверяем старое число на значение 0, потому что число не может начинаться с 0
        if (old_number == '0' && new_number != ".") {
            document.getElementById('input_field').value = new_number;
        // Если строе число не 0, тогда просто добавляем к старому числу новое
        } else {
            if (!old_number && new_number == ".") {
                old_number = '0';
            }
            document.getElementById('input_field').value = old_number + new_number;
        }
    // Если строка не пуста, проверим, что она является числом
    // Если строка является числом, тогда обнуляем строку вывода и добавляем в строку ввода число из вывода + нововеденное число
    } else if (!isNaN(output_number)) {
        if ((output_number.includes(".")) && new_number == ".") {
            new_number = "";
        }
        document.getElementById('output_field').value = "";
        document.getElementById('input_field').value = output_number + new_number;
    // Иначе просто добавляем новое число к старому, при условии, что там нет БЕСКОНЕЧНОСТИ
    } else if (output_number == infinity_str) {
        document.getElementById('output_field').value = "";
        if (new_number == ".") {   
            document.getElementById('input_field').value = "0" + new_number;    
        } else {
            document.getElementById('input_field').value = new_number;
        }
    } else if (!old_number  && new_number == ".") {    
        document.getElementById('input_field').value = '0'+ new_number;
    } else {
        document.getElementById('input_field').value = old_number + new_number;
    }
}

function operation(action) {

    if (typeof action == 'object') {
        action = this.id;
    }

    // Берем значения из строки ввода и вывода
    let output = document.getElementById('output_field').value;
    let input = document.getElementById('input_field').value;

    // Две строки пусты и знак действия '-'
    if (!input && !output && action == '-') {
        document.getElementById('input_field').value = action;
        return;
    }

    if (!input && !output) {
        alert('Введите число!')
        return;
    }

    if (output == infinity_str) {
        alert('Введите число!');
        output = '';
        document.getElementById('output_field').value = output;
        return;
    }

    // Строка ввода пуста
    if (!input) {
        // Если строка ввода пуста мы просто добавляем знак действия к строке вывода
        if (isNaN(output)){
            output = output.slice(0, -1) + action;
            document.getElementById('output_field').value = output;
        } else {
            document.getElementById('output_field').value = output + action;
        }
        return;
    }

    // Строка вывода пуста
    if (input != '-' && output == '') {
        output = input;
        input = '';
        document.getElementById('output_field').value = output + action;
        document.getElementById('input_field').value = input;
        return;
    }

    // Две строки не пусты
    let calculation =  eval(parseFloat(output)+output[output.length - 1]+ '(' + input + ')');
    if (calculation == 1/0 || calculation == -1/0) {
        document.getElementById('output_field').value = infinity_str;
    } else {
        document.getElementById('output_field').value = parseFloat(calculation.toFixed(13)) + action;
        document.getElementById('input_field').value = '';
    }
}

function equals() {
    // Берем значение из строки ввода
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;
    // Проверяем значение из строки ввода на пустоту
    if (isNaN(input)) {
        output = eval(output + last_action);
        document.getElementById('output_field').value = parseFloat(output.toFixed(13));
        return;
    } else {
        // Если значение из строки ввода не строка, тогда присваиваем значению из поля ввода пустую строку
        document.getElementById('input_field').value = '';
    }

    // Проверяем значение которое получится при сложении значений полей ввода и вывода на Not a Number
    if (isNaN(output+input)) {
        // Если оно верно, то это значит, что наше выражение имеет вид (x {operation} y)
        // Проверяем результат (x {operation} y) на деление на ноль 
        last_action = output[output.length-1]+'(' + input + ')';
        let verif_oper = eval(parseFloat(output) + last_action);
        
        if (verif_oper == Infinity || verif_oper == -Infinity) {
            document.getElementById('output_field').value = infinity_str;
        } else {
             output = eval(parseFloat(output) + last_action);
            // Если он не находит ошибки Infinity, тогда можем вывести полученное число в поле вывода
            document.getElementById('output_field').value = parseFloat(verif_oper.toFixed(13));
        }
    // Если оно соответствует типу Number, тогда это значит, что пользователь не ввёл операцию
    } else {
        alert('Выберите операцию!');
    }
}

function delete_all() {
    document.getElementById('input_field').value = '';
    document.getElementById('output_field').value = '';
}

function backspace() {
    let input_field = document.getElementById('input_field').value;
    // slice оставляет символы от 0 до предпоследнего
    input_field = input_field.slice(0, -1);
    document.getElementById('input_field').value = input_field;
}

function procent() {
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;
    let output_num = parseFloat(output);
    if (!output_num) {
        alert("Я не умею искать процент от ничего!");
        return;
    }

    // Проверяем сроку ввода на Not a Number alert(numbers)
    if (!input) {
        alert("Я не знаю как выполнять математические операции со строками...(");
    // Иначе делим наше число на 100 и выполняем код <output+action>
    } else {
        let action = output_num*(input/100);
        output = eval(output+action);
        output = output.toFixed(13);
        document.getElementById('output_field').value = output;
        document.getElementById('input_field').value = '';
    }
}

function pm() {
    let inputString = document.getElementById('input_field').value;
    let input = parseFloat(inputString);
    // Если число не ноль тогда мы можем поменять у него знак
    if (!isNaN(input)) {
        let lastIndex = inputString.length - 1;
        let lastSymbol = '';
        if (inputString[lastIndex] == '.') {
            lastSymbol = '.';
        }
        input = input*(-1);
        document.getElementById('input_field').value = input + lastSymbol;
    }
}


document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            input_numbers(event.key);
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            operation(event.key);
            break;
        case 'Enter':
            equals();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Delete':
            delete_all();
            break;
        default:
            break;
        }
    }
);

function domcl() {

    //Ищем все элементы класса number
    let numbers = document.getElementsByClassName("number");
    for (let i = 0; i < numbers.length; i++) {
        //Прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем функцию input_numbers
        numbers[i].addEventListener('click', input_numbers);
    }
    //Ищем все элементы класса operation
    let operations = document.getElementsByClassName("operation");
    for (let i = 0; i < operations.length; i++) {
        //Прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем функцию operation
        operations[i].addEventListener('click', operation);
    }

    // Ищем элемент по id и прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем соответствующие функции
    document.getElementById("procent").addEventListener('click', procent);
    document.getElementById("pm").addEventListener('click', pm);
    document.getElementById("delete").addEventListener('click', delete_all);
    document.getElementById("equals").addEventListener('click', equals);
}

//Событие на полную прогрузку структуры html документа
document.addEventListener('DOMContentLoaded', domcl);