let courseData = null;

function buildHoles() {
    $(".container").append(`<div class="baseRow"><div class="col">Holes</div></div>`);
    for (let i = 0; i < 9; i++) {
        $('.baseRow').append(`<div class="col">${i + 1}</div>`);
    }
    $(".baseRow").append(`<div class="col">Out</div>`);
    for (let i = 9; i < 18; i++) {
        $('.baseRow').append(`<div class="col">${i + 1}</div>`);
    }
    $(".baseRow").append(`<div class="col">In</div><div class="col">Total</div>`);
}

$.ajax({
    url: "https://golf-courses-api.herokuapp.com/courses/18300"
}).done(data => {
        courseData = data;
        buildHoles();
    }
);
