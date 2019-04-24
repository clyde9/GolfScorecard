class PlayerGroup {
    constructor() {
        this.collection = [];
    }
    
    addPlayer() {
        let name = $('#playerNameInput').val();
        if (!name) {
            name = "New Player";
        }
        let tee = $('#teeSelect').val();
        let player = new Player(name, tee);
        this.collection.push(player);
        makePlayerTable(player);
        
    }
    
    removePlayer() {
    
    }
}

class Player {
    constructor(name, tee) {
        this.name = name;
        this.tee = tee;
        
        this.scores = [];
        for (let i = 0; i < 18; i++) {
            this.scores.push(0);
        }
    }
    
    changeScore(hole, score) {
        this.scores[hole] = score;
    }
    
    rename() {
    
    }
    
    changeTee() {
    
    }
    
    calculateOutScore() {
        let outScore = 0;
        for (let i = 0; i < 9; i++) {
            outScore += this.scores[i];
        }
        return outScore;
    }
    
    calculateInScore() {
        let inScore = 0;
        for (let i = 9; i < 18; i++) {
            inScore += this.scores[i];
        }
        return inScore;
    }
    
    calculateTotalScore() {
        return this.calculateOutScore() + this.calculateInScore();
    }
}

function makeAddPlayerForm() {
    $('.container').append(`
        <div class="addPlayerForm">
            <div>
                <label for="playerNameInput">Player Name:</label>
                <input type="text" id="playerNameInput" placeholder="Player Name">
            </div>
            <div>
                <label for="teeSelect">Tee:</label>
                <select id="teeSelect">
                    <option value="2">Men</option>
                    <option value="3">Women</option>
                    <option value="0">Pro</option>
                    <option value="1">Champion</option>
                </select>
            </div>
            <button onclick="players.addPlayer()">Add Player</button>
        </div>`)
}

function makePlayerTable(player) {
    let pNumber = players.collection.indexOf(player);
    $('.scorecards').append(`
        <table class="table table-bordered table-sm player${pNumber}">
            <thead>
            </thead>
            <tbody>
            </tbody>
        </table>`);
    buildHolesRow(pNumber);
    buildParRow(pNumber, player.tee);
    buildYardageRow(pNumber, player.tee);
    buildHandicapRow(pNumber, player.tee);
    buildScoreRow(pNumber);
}

function buildHolesRow(pNumber) {
    $(`.player${pNumber} thead`).append(`<tr class="holesRow${pNumber}"><th scope="col">${players.collection[pNumber].name}</th></tr>`);
    for (let i = 0; i < 9; i++) {
        $(`.holesRow${pNumber}`).append(`<th scope="col">${i + 1}</th>`);
    }
    $(`.holesRow${pNumber}`).append(`<th scope="col">Out</th>`);
    for (let i = 9; i < 18; i++) {
        $(`.holesRow${pNumber}`).append(`<th scope="col">${i + 1}</th>`);
    }
    $(`.holesRow${pNumber}`).append(`<th scope="col">In</th><th scope="col">Total</th>`);
}

function buildParRow(pNumber, tee) {
    $(`.player${pNumber} tbody`).append(`<tr class="parRow${pNumber}"><th scope="row">Par</th></tr>`);
    let outPar = 0;
    for (let j = 0; j < 9; j++) {
        $(`.parRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].par}</td>`);
        outPar += courseInfo.data.holes[j].teeBoxes[tee].par;
    }
    $(`.parRow${pNumber}`).append(`<td>${outPar}</td>`);
    let inPar = 0;
    for (let j = 9; j < 18; j++) {
        $(`.parRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].par}</td>`);
        inPar += courseInfo.data.holes[j].teeBoxes[tee].par;
    }
    $(`.parRow${pNumber}`).append(`<td>${inPar}</td><td>${outPar + inPar}</td>`);
}

function buildYardageRow(pNumber, tee) {
    $(`.player${pNumber} tbody`).append(`<tr class="yardageRow${pNumber}"><th scope="row">Yardage</th></tr>`);
    let outYards = 0;
    for (let j = 0; j < 9; j++) {
        $(`.yardageRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].yards}</td>`);
        outYards += courseInfo.data.holes[j].teeBoxes[tee].yards;
    }
    $(`.yardageRow${pNumber}`).append(`<td>${outYards}</td>`);
    let inYards = 0;
    for (let j = 9; j < 18; j++) {
        $(`.yardageRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].yards}</td>`);
        inYards += courseInfo.data.holes[j].teeBoxes[tee].yards;
    }
    $(`.yardageRow${pNumber}`).append(`<td>${inYards}</td><td>${outYards + inYards}</td>`);
}

function buildHandicapRow(pNumber, tee) {
    $(`.player${pNumber} tbody`).append(`<tr class="handicapRow${pNumber}"><th scope="row">Handicap</th></tr>`);
    for (let j = 0; j < 9; j++) {
        $(`.handicapRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].hcp}</td>`);
    }
    $(`.handicapRow${pNumber}`).append(`<td></td>`);
    for (let j = 9; j < 18; j++) {
        $(`.handicapRow${pNumber}`).append(`<td>${courseInfo.data.holes[j].teeBoxes[tee].hcp}</td>`);
    }
    $(`.handicapRow${pNumber}`).append(`<td></td><td></td>`);
}

function buildScoreRow(pNumber) {

}

let players = new PlayerGroup();
let courseInfo;

(function () {
    $.ajax({
        url: "https://golf-courses-api.herokuapp.com/courses/11819"
    }).done(data => {
            courseInfo = data;
            makeAddPlayerForm();
        }
    )
})();
