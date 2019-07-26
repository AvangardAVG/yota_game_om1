const win_ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;
const cnvs = document.getElementById("cnvs");
const cntx = cnvs.getContext("2d");
const cnvs_w = document.body.getBoundingClientRect().width;
const cnvs_h = cnvs_w * win_ratio;
const adaptive = win_ratio > 1 ? cnvs_h : cnvs_w;
const simple_font_size = adaptive / 35;
const small_font_size = simple_font_size / 2.4;
const line_width = simple_font_size / 8;
const txt_y_magic = simple_font_size / 3;
const cloud_txt_ratio = 1.3;
const gb_type = 0;
const min_type = 1;
const types = ["ГБ", "мин"];
const gbs = [1, 2, 3, 4];
const mins = [1, 5, 10, 20];
const infinity = "∞";
const simple_speed = adaptive / 1500;
const min_boost = 3;
const max_boost = 4;
const btn_rad = adaptive / 60;
const minus_w = adaptive / 60;
const minus_h = minus_w / 3;
const minus_rad = minus_h / 2;
const cloud_color = "#00aeef";
const tariff_color = "#00aeef";
const btn_color = "#ffffff";
const minus_color = "#00aeef";
const txt_color = "#ffffff";
const cloud_speed_color = [
    "#66d6ff",
    "#4dcfff",
    "#33c9ff",
    "#1ac2ff",
    "#00bbff",
    "#1ac2ff",
    "#33c9ff",
    "#4dcfff"
];
const simple_cooldown = 6;
const fast_cooldown = 1;
const btn_timer = 60;

cnvs.setAttribute('width', cnvs_w);
cnvs.setAttribute('height', cnvs_h);

onmousemove = on_mousemove;
ontouchmove = on_touchmove;
cnvs.onmousedown = cnvs_on_mousedown;
cnvs.ontouchstart = cnvs_on_touchstart;
cnvs.onmouseleave = cnvs_on_mouseleave;
cnvs.onmouseup = cnvs_on_mouseup;
cnvs.ontouchend = cnvs_on_touchend;

var gb_btn_counter = 0;
var gb_btn_timer = 0;
var min_btn_counter = 0;
var min_btn_timer = 0;
var caught = false;
var movement = false;
var tar = new Tariff();
var yb = new Yota_button();
const arr = [
    new Cloud(gbs[0], gb_type),
    new Cloud(gbs[1], gb_type),
    new Cloud(gbs[2], gb_type),
    new Cloud(gbs[3], gb_type),
    new Cloud(mins[0], min_type),
    new Cloud(mins[1], min_type),
    new Cloud(mins[2], min_type),
    new Cloud(mins[3], min_type)
];

function draw() {
    cntx.clearRect(0, 0, cnvs.width, cnvs.height);

    if (gb_btn_timer !== 0) {
        gb_btn_timer--;
    } else {
        gb_btn_counter = 0;
    }
    if (min_btn_timer !== 0) {
        min_btn_timer--;
    } else {
        min_btn_counter = 0;
    }

    tar.draw_tariff();

    for (let i = 0; i < arr.length; i++) {
        arr[i].y += arr[i].speed;

        if (arr[i].x - tar.x > -tar.width / 2 && arr[i].x - tar.x < tar.width / 2 &&
            arr[i].y - tar.y > -tar.height / 2 && arr[i].y - tar.y < tar.height / 2) {
            if (arr[i].type === gb_type) {
                if (tar.gb_counter.number + arr[i].number > 50) {
                    tar.gb_counter.number = 51;
                    tar.gb_counter.infinity = true;
                } else {
                    tar.gb_counter.number += arr[i].number;
                }
            } else {
                if (tar.min_counter.number + arr[i].number > 2000) {
                    tar.min_counter.number = 2000;
                } else {
                    tar.min_counter.number += arr[i].number;
                }
            }
            arr[i].new_position();
            caught = true;
        }

        if (arr[i].y > cnvs.height + arr[i].height / 2) {
            arr[i].new_position();
        }

        arr[i].draw_cloud();
    }

    if (caught) {
        yb.draw_complete();
    }

    requestAnimationFrame(draw);
}

draw();