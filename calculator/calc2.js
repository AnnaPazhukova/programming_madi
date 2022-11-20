//берем новую цифру  и старое число что уже было введено и прибавляем их друг к другу
function input_numbers(id) {
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    //let output_number =  document.getElementById('output_field').value;
    
    if (old_number == '' && new_number == ".") {
        document.getElementById('input_field').value = '0'+ new_number;
        return;
    }

    if (old_number.includes(".") && new_number == ".") {
        new_number = "";
        document.getElementById('input_field').value = old_number + new_number;
        return;
    }

    document.getElementById('input_field').value = old_number + new_number;
}

function operation(action) {
    let output = document.getElementById('output_field').value;
    let input = document.getElementById('input_field').value;
    //if (input == '') {
    //    document.getElementById('output_field').value = output + action;
    //}
    if (output == '') {
        output = input;
        document.getElementById('output_field').value = output + action;
        document.getElementById('input_field').value = '';
    } else {
        let calculation = eval(output + input);
        document.getElementById('output_field').value = parseFloat(calculation.toFixed(13)) + action;
        document.getElementById('input_field').value = '';
    }
}

function equels() {
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;

    if (isNaN(input)) {
        alert('Введите число!')
        return
    } else {
        document.getElementById('input_field').value = '';
         }
    
    if (isNaN(output+input)) {
        output = eval(parseFloat(output)+output[output.length-1]+input);
        document.getElementById('output_field').value = parseFloat(output.toFixed(13));
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
    // Проверяем сроку ввода на Not a Number 
    if (isNaN(input)) {
        input = '';
        alert("Я не знаю как выполнять математические операции со строками...(");
    // Иначе делим наше число на 100 и выполняем код <output+action>
    } else {
        let action = input/100;
        output = eval(output+action);
        document.getElementById('output_field').value = output;
        document.getElementById('input_field').value = '';
    }
}

function pm() {
    let input = parseFloat(document.getElementById('input_field').value);
    // Если число не ноль тогда мы можем поменять у него знак
    if (input != 0) {
        input = input*(-1);
        document.getElementById('input_field').value = input;
    }
}


document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '0':
            input_numbers(event.key);
            break;
        case '1':
            input_numbers(event.key);
            break;
        case '2':
            input_numbers(event.key);
            break;
        case '3':
            input_numbers(event.key);
            break;
        case '4':
            input_numbers(event.key);
            break;
        case '5':
            input_numbers(event.key);
            break;
        case '6':
            input_numbers(event.key);
            break;
        case '7':
            input_numbers(event.key);
            break;
        case '8':
            input_numbers(event.key);
            break;
        case '9':
            input_numbers(event.key);
            break;
        case '.':
            input_numbers(event.key);
            break;
        case '/':
            operation(event.key);
            break;
        case '*':
            operation(event.key);
            break;
        case '-':
            operation(event.key);
            break;
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