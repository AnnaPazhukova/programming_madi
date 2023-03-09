

let MAP_LENGTH = 50; //Не ставить меньше 3!
if (MAP_LENGTH % 2 == 0) {MAP_LENGTH = MAP_LENGTH - 1;}

const LIFES_COUNT = 8;
const END_POS = {x:MAP_LENGTH-1, y:MAP_LENGTH-1};
let matrixOfMap = createMatrixOfMap();
let maze;
let heroOptions;
let blockWidth;
let blockHeight;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Tractor {

    constructor() {
        this.x = 0,
        this.y = 0;
    }

    goNewPath() {
        let newPath = this._getNewPath();
        let stepOnHorizontal = Math.floor(Math.random()*2);
        if (stepOnHorizontal) {

            let newPosX = this.x + newPath;
            
            while (!this._tractorInMap(newPosX)) {
                newPath = this._getNewPath();
                newPosX = this.x + newPath;
            }
            
            if (blockIsWall(this.y, newPosX)) {
                this._crashWallsOnHorizontal(newPosX, newPath);
            }
            
            this.x = newPosX;
    
        } else {
            let newPosY = this.y + newPath 
            
            while (!this._tractorInMap(newPosY)) {
                newPath = this._getNewPath();
                newPosY = this.y + newPath;
            }

            if (blockIsWall(newPosY, this.x)) {
                this._crashWallsOnVertical(newPosY, newPath)
            }

            this.y = newPosY;
            
            }   
    }

    _tractorInMap(newPos) {
       return newPos >= 0 && newPos <= MAP_LENGTH - 1
    }
    
    _crashWallsOnHorizontal(newPosX,newPath) {
        if (newPath > 0) {
            matrixOfMap[this.y][newPosX] = 0;
            matrixOfMap[this.y][newPosX-1] = 0;
        } else {
            matrixOfMap[this.y][newPosX] = 0;
            matrixOfMap[this.y][newPosX+1] = 0;
        }
    }

    _crashWallsOnVertical(newPosY,newPath) {
        if (newPath > 0) {
            matrixOfMap[newPosY][this.x] = 0;
            matrixOfMap[newPosY-1][this.x] = 0;
        } else {
            matrixOfMap[newPosY][this.x] = 0;
            matrixOfMap[newPosY+1][this.x] = 0;
        }
    }
    
    _getNewPath() {
        let path = [-2, 2];
        return path[Math.floor(Math.random()*2)]
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Hero {
    constructor(options) {
        this.x = options.x,
        this.y = options.y,
        this.lifes = options.lifes,
        this.myWidth = options.width,
        this.myHeight = options.height
    }

    drawLifes() {
        let lifesContainer = document.getElementById('life');
        for (let i = 0; i < this.lifes; i++) {
            let heart = document.createElement('img');
            heart.src = 'photo/heart.png';
            heart.className = 'live';
            lifesContainer.append(heart);
        }
    }

    drawMe(){
        maze.fillStyle = 'red';
        maze.fillRect(this.x*this.myWidth,this.y*this.myHeight,this.myWidth,this.myHeight) //TODO - сократить
    }
    
    _clearMe(){
        maze.fillStyle = 'black';
        maze.fillRect(this.x*this.myWidth,this.y*this.myHeight,this.myWidth,this.myHeight); //TODO - сократить
    }
    
    _meetWall(){
        if (this.x < 0 || this.x > matrixOfMap[0].length - 1 || this.y < 0 || this.y > matrixOfMap.length - 1 || matrixOfMap[this.y][this.x] === 1) { //TODO - cократить
            this._deleteLife();
            return true;
        }
    }
    
    hitAnimation() {} //TODO - сделать функцию анимирования при столкновении со стеной

    _deleteLife() {
        let live = document.getElementsByClassName('live');
        live[--this.lifes].src = `${live[this.lifes].src.slice(0,-9)}emptyherat.png`;
        if (this.lifes <= 0) {
            endGame(false);
        }
    }

    doStep(event) {
        this._clearMe();
        switch (event.key) {
            case 'w':
            case 'W':
            case 'Ц':
            case 'ц':
            case 'ArrowUp':
                this.y--; if (this._meetWall()) {this.y++;};
                break;
            case 'a':
            case 'A':
            case 'ф':
            case 'Ф':
            case 'ArrowLeft':
                this.x--; if (this._meetWall()) {this.x++;};
                break;
            case 'd':
            case 'D':
            case 'в':
            case 'В':
            case 'ArrowRight':
                this.x++; if (this._meetWall()) {this.x--;};
                break;
            case 's':
            case 'S':
            case 'ы':
            case 'Ы':
            case 'ArrowDown':
                this.y++; if (this._meetWall()) {this.y--;};
                break;
            default:
                break;
        }

        this.drawMe();
        if (this.x == END_POS.x && this.y == END_POS.y) {
            endGame(true);
        }
    } 
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tractor;
let hero;
document.addEventListener('DOMContentLoaded', main);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {
    tractor = new Tractor;
    drawMaze();
    hero = new Hero(heroOptions);
    hero.drawLifes();
    hero.drawMe();
    document.addEventListener('keydown', hero.doStep.bind(hero));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function drawMaze() {
    let canvas = document.getElementById("canvas");
    maze = canvas.getContext("2d");
    blockWidth = canvas.width/matrixOfMap[0].length;
    blockHeight = canvas.height/matrixOfMap.length;

    heroOptions = {
        x:0,
        y:0,
        lifes: LIFES_COUNT,
        width:blockWidth,
        height:blockHeight
    };

    createMaze();
    drawWalls();
}

function drawWalls() {
    for (let i = 0;i < matrixOfMap.length; i++) {
        for (let j = 0; j < matrixOfMap[0].length; j++) {
            if (blockIsWall(i,j)){
                maze.fillStyle = 'purple';
                maze.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            }  
        }
    }
    maze.fillStyle = 'yellow';
    maze.fillRect(END_POS.x*blockWidth, END_POS.y*blockHeight, blockWidth, blockHeight);
}

function blockIsWall(y, x) {
    return matrixOfMap[y][x] == 1
}

function createMatrixOfMap() {
    let matrixOfMap = [];

    for (let y = 0; y < MAP_LENGTH; y++) {
        let row = [];
        for (let x = 0; x < MAP_LENGTH; x++) {
            row.push(1);
        }

        matrixOfMap.push(row);
    }

    matrixOfMap[0][0] = 0;
    return matrixOfMap
}

function createMaze() {
    while (!mazeIsReady()) {
        for (let i = 0; i < 1000; i++) {
            tractor.goNewPath();
        } 
    } 
} 

function mazeIsReady() {
    for (let i = 0; i< MAP_LENGTH; i+=2) {
        for (let j = 0; j < MAP_LENGTH; j+=2) {
            if (blockIsWall(i,j)) {
                return false;
            }
        }
    }
    return true;
}

function endGame(bool) {
    document.getElementById("maze").remove();
    document.getElementById("life").remove()
    let div = document.createElement('div');
    div.className = 'endGame';
    
    if (bool) {
        div.innerHTML = 'YOU WIN!';    
    } else {
        div.innerHTML = 'YOU LOSE!';
    }
    document.body.append(div);
}