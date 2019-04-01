function buildHoles() {
    $(".container").append(`<div class="row holesRow"><div class="col">Holes</div></div>`);
    for (let i = 0; i < 9; i++) {
        $('.holesRow').append(`<div class="col">${i + 1}</div>`);
    }
    $(".holesRow").append(`<div class="col">Out</div>`);
    for (let i = 9; i < 18; i++) {
        $('.holesRow').append(`<div class="col">${i + 1}</div>`);
    }
    $(".holesRow").append(`<div class="col">In</div><div class="col">Total</div>`);
}

function buildPar(courseData){
    $(".container").append(`<div class="row parRow"><div class="col">Par</div></div>`);
    let outPar = 0;
    for (let j = 0; j < 9; j++) {
        $(`.parRow`).append(`<div class="col">${courseData.data.holes[j].teeBoxes[0].par}</div>`);
        outPar += courseData.data.holes[j].teeBoxes[0].par;
    }
    $(`.parRow`).append(`<div class="col">${outPar}</div>`);
    let inPar = 0;
    for (let j = 9; j < 18; j++) {
        $(`.parRow`).append(`<div class="col">${courseData.data.holes[j].teeBoxes[0].par}</div>`);
        inPar += courseData.data.holes[j].teeBoxes[0].par;
    }
    $(`.parRow`).append(`<div class="col">${inPar}</div><div class="col">${outPar + inPar}</div>`);
}



$.ajax({
    url: "https://golf-courses-api.herokuapp.com/courses/11819"
}).done(data => {
        buildHoles();
        buildPar(data);
    }
);
