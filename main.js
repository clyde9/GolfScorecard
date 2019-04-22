class PlayerGroup{
    constructor(){
        this.collection = [];
    }
    addPlayer(){
    
    }
    removePlayer(){
    
    }
}

class Player{
    constructor(name, tee){
        this.name = name;
        this.tee = tee;
        
        this.scores = [];
        for (let i = 0; i < 18; i++){
            this.scores.push(0);
        }
    }
    changeScore(hole, score){
        this.scores[hole] = score;
    }
    rename(){
    
    }
    changeTee(){
    
    }
    calculateOutScore(){
        let outScore = 0;
        for (let i = 0; i < 9; i++){
            outScore += this.scores[i];
        }
        return outScore;
    }
    calculateInScore(){
        let inScore = 0;
        for (let i = 9; i < 18; i++){
            inScore += this.scores[i];
        }
        return inScore;
    }
    calculateTotalScore(){
        return this.calculateOutScore() + this.calculateInScore();
    }
}



function buildHoles() {
    $(".mainTable thead").append(`<tr class="holesRow"><th scope="col"></th></tr>`);
    for (let i = 0; i < 9; i++) {
        $('.holesRow').append(`<th scope="col">${i + 1}</th>`);
    }
    $(".holesRow").append(`<th scope="col">Out</th>`);
    for (let i = 9; i < 18; i++) {
        $('.holesRow').append(`<th scope="col">${i + 1}</th>`);
    }
    $(".holesRow").append(`<th scope="col">In</th><th scope="col">Total</th>`);
}

function buildPar(courseData){
    $(".mainTable tbody").append(`<tr class="parRow"><th scope="row">Par</th></tr>`);
    let outPar = 0;
    for (let j = 0; j < 9; j++) {
        $(`.parRow`).append(`<td>${courseData.data.holes[j].teeBoxes[0].par}</td>`);
        outPar += courseData.data.holes[j].teeBoxes[0].par;
    }
    $(`.parRow`).append(`<td>${outPar}</td>`);
    let inPar = 0;
    for (let j = 9; j < 18; j++) {
        $(`.parRow`).append(`<td>${courseData.data.holes[j].teeBoxes[0].par}</td>`);
        inPar += courseData.data.holes[j].teeBoxes[0].par;
    }
    $(`.parRow`).append(`<td>${inPar}</td><td>${outPar + inPar}</td>`);
}



$.ajax({
    url: "https://golf-courses-api.herokuapp.com/courses/11819"
}).done(data => {
        buildHoles();
        buildPar(data);
    }
);
