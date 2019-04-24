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
        let player = new Player(name, tee, this.collection.length);
        this.collection.push(player);
        makePlayerTable(player);
        
        if (this.collection.length === 4) {
            $(`.addPlayerForm`).html('');
        }
    }
}

class Player {
    constructor(name, tee, index) {
        this.name = name;
        this.tee = tee;
        this.index = index;
        
        this.scores = [];
        for (let i = 0; i < 18; i++) {
            this.scores.push(0);
        }
    }
    
    changeScore(hole) {
        this.scores[hole] = $(`.p${this.index}h${hole}`).val();
        if (hole < 9){
            $(`.p${this.index}hOut`).html(this.calculateOutScore())
        } else {
            $(`.p${this.index}hIn`).html(this.calculateInScore())
        }
        $(`.p${this.index}hTotal`).html(this.calculateTotalScore())
    }
    
    rename() {
        this.name = $(`.p${this.index}Name`).html();
    }
    
    changeTee() {
        this.tee = $(`#teeChange${this.index}`).val();
        
        $(`.p${this.index} thead`).html('');
        $(`.p${this.index} tbody`).html('');
        
        buildHolesRow(this.index);
        buildParRow(this.index, this.tee);
        buildYardageRow(this.index, this.tee);
        buildHandicapRow(this.index, this.tee);
        buildScoreRow(this.index);
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
                    <option value="0">Pro</option>
                    <option value="1">Champion</option>
                    <option value="2">Men</option>
                    <option value="3">Women</option>
                </select>
            </div>
            <button onclick="players.addPlayer()">Add Player</button>
        </div>`)
}

function makePlayerTable(player) {
    let pNumber = players.collection.indexOf(player);
    $('.scorecards').append(`
        <div class="p${pNumber} playerCard">
            <table class="table table-bordered table-sm">
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div>
                <label for="teeChange${pNumber}">Change Tee:</label>
                <select onchange="players.collection[${pNumber}].changeTee()" id="teeChange${pNumber}">
                    <option value="0">Pro</option>
                    <option value="1">Champion</option>
                    <option value="2">Men</option>
                    <option value="3">Women</option>
                </select>
            </div>
        </div>`);
    $(`#teeChange${pNumber} option:eq(${player.tee})`).attr('selected', 'selected');
    buildHolesRow(pNumber);
    buildParRow(pNumber, player.tee);
    buildYardageRow(pNumber, player.tee);
    buildHandicapRow(pNumber, player.tee);
    buildScoreRow(pNumber);
}

function buildHolesRow(pNumber) {
    $(`.p${pNumber} thead`).append(`<tr class="holesRow${pNumber}"><th class="p${pNumber}Name" contenteditable="true" onkeyup="players.collection[${pNumber}].rename()" scope="col">${players.collection[pNumber].name}</th></tr>`);
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
    $(`.p${pNumber} tbody`).append(`<tr class="parRow${pNumber}"><th scope="row">Par</th></tr>`);
    let outPar = 0;
    for (let i = 0; i < 9; i++) {
        $(`.parRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].par}</td>`);
        outPar += courseInfo.data.holes[i].teeBoxes[tee].par;
    }
    $(`.parRow${pNumber}`).append(`<td>${outPar}</td>`);
    let inPar = 0;
    for (let i = 9; i < 18; i++) {
        $(`.parRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].par}</td>`);
        inPar += courseInfo.data.holes[i].teeBoxes[tee].par;
    }
    $(`.parRow${pNumber}`).append(`<td>${inPar}</td><td>${outPar + inPar}</td>`);
}

function buildYardageRow(pNumber, tee) {
    $(`.p${pNumber} tbody`).append(`<tr class="yardageRow${pNumber}"><th scope="row">Yardage</th></tr>`);
    let outYards = 0;
    for (let i = 0; i < 9; i++) {
        $(`.yardageRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].yards}</td>`);
        outYards += courseInfo.data.holes[i].teeBoxes[tee].yards;
    }
    $(`.yardageRow${pNumber}`).append(`<td>${outYards}</td>`);
    let inYards = 0;
    for (let i = 9; i < 18; i++) {
        $(`.yardageRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].yards}</td>`);
        inYards += courseInfo.data.holes[i].teeBoxes[tee].yards;
    }
    $(`.yardageRow${pNumber}`).append(`<td>${inYards}</td><td>${outYards + inYards}</td>`);
}

function buildHandicapRow(pNumber, tee) {
    $(`.p${pNumber} tbody`).append(`<tr class="handicapRow${pNumber}"><th scope="row">Handicap</th></tr>`);
    for (let i = 0; i < 9; i++) {
        $(`.handicapRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].hcp}</td>`);
    }
    $(`.handicapRow${pNumber}`).append(`<td></td>`);
    for (let i = 9; i < 18; i++) {
        $(`.handicapRow${pNumber}`).append(`<td>${courseInfo.data.holes[i].teeBoxes[tee].hcp}</td>`);
    }
    $(`.handicapRow${pNumber}`).append(`<td></td><td></td>`);
}

function buildScoreRow(pNumber) {
    $(`.p${pNumber} tbody`).append(`<tr class="scoreRow${pNumber}"><th scope="row">Score</th></tr>`);
    for (let i = 0; i < 9; i++) {
        $(`.scoreRow${pNumber}`).append(`
            <td>
                <input class="p${pNumber}h${i}" onchange="players.collection[pNumber].changeScore(${i - 1})" type="number"/>
            </td>`);
    }
    
    $(`.scoreRow${pNumber}`).append(`
        <td class="p${pNumber}hOut">
            ${players.collection[pNumber].calculateOutScore()}
        </td>`);
    
    for (let i = 9; i < 18; i++) {
        $(`.scoreRow${pNumber}`).append(`
            <td>
                <input class="p${pNumber}h${i}" onchange="players.collection[pNumber].changeScore(${i - 1})" type="number"/>
            </td>`);
    }
    $(`.scoreRow${pNumber}`).append(`
        <td class="p${pNumber}hIn">
            ${players.collection[pNumber].calculateInScore()}
        </td>
        <td class="p${pNumber}hTotal">
            ${players.collection[pNumber].calculateTotalScore()}
        </td>`);
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
