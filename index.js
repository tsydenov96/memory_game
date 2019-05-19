var codes = [
'1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'
];

function getRandomInt() {
    return Math.floor(Math.random() * 2) - 1;
}

//перемешиванием номера цветов
codes.sort(() => getRandomInt());

let cont = document.querySelector('.container');
let cell;
let timer, currTimer, winTime = 0;
for (let i = 0; i < 16; i++) {
    cell = document.createElement('div');
    cell.className = `cell color${codes[i]} hidden`;
    cell.setAttribute('color', `color${codes[i]}`);
    cont.appendChild(cell);
}

function getStarted() {
    var check = false, selectedColor = 0, selectedElem, steps = 0, open = 0, timer;
    var  a = document.getElementsByClassName('cell');

    for (var i = 0; i < a.length; i++) {
        a[i].addEventListener('click', function(e){
            steps++;
            var elem = e.target;

            //проверка на неоткрытый блок
            if (elem.className.search('hidden')+1){
                elem.className = elem.className.replace(' hidden', '');
                setTimeout(function(){

                    //если кликнули на вторую картинку в паре
                    if (check){
                        check = false;

                        //если цвета совпали
                        if (elem.getAttribute('color') === selectedColor) {
                            open++;
                            if (open == 8) {
                                winTime = 1;
                                alert(`Вы выиграли! \nЗатраченное время: ${currTimer}`);
                                timer = 0;
                            }
                        }
                        else {

                            //если цвета не совпали, то прячем блок
                            selectedElem.className += ' hidden'; 
                            elem.className += ' hidden';
                        }
                    }
                    else {

                        //если кликнули на первую картинку в паре
                        selectedColor = elem.getAttribute('color'); selectedElem = elem; check = true;
                    }
                    //таймаут чтобы видеть цвет кликнутого блока
                }, 100);
            };
        });
    }
}

function time() {
    let interval = setInterval(() => {
        let currTime = new Date().getTime();
        let min = Math.floor((currTime - timer) / 60000);
        if (min / 10 < 1) {
            min = `0${min}`;
        }
        let sec = (currTime - timer) / 1000;
        if (sec / 10 < 1) {
            sec = `0${sec}`;
        }
        if (winTime !== 0) 
            return;
        currTimer = `${min}:${sec}`;
        document.getElementById('timer').innerHTML = currTimer
    },100);
}

function start() {
    timer = new Date().getTime();
	getStarted();
	time();
    console.log();
}
