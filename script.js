const win_ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;
const cnvs = document.getElementById("cnvs");
const cntx = cnvs.getContext("2d");
const cnvs_w = document.body.getBoundingClientRect().width - cnvs.offsetLeft;
const cnvs_h = cnvs_w * win_ratio - cnvs.offsetTop;
const adaptive = win_ratio > 1 ? cnvs_h : cnvs_w;
const simple_font_size = adaptive / 35;
const small_font_size = simple_font_size / 2.4;
const line_width = simple_font_size / 8;
const txt_y_magic = simple_font_size / 3;
const cloud_txt_ratio = 1.3;
const small_rotation = 0.15;
const gb_type = 0;
const min_type = 1;
const types = ["ГБ", "мин"];
const gbs = [1, 2, 5, 10];
const mins = [5, 20, 50, 200];
const infinity = "∞";
const simple_speed = adaptive / 1500;
const boost = simple_speed * 2;
const boost_radius = adaptive / 6;
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
const simple_cooldown = 8;
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
var mouse_x = null;
var mouse_y = null;
var caught = null;
var tar = new Tariff();
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
        if (arr[i].caught) {
            arr[i].x = mouse_x;
            arr[i].y = mouse_y;
        } else {
            var dx = arr[i].x - mouse_x;
            var dy = arr[i].y - mouse_y;
            var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (r < boost_radius) {
                arr[i].speed = boost - (boost - simple_speed) * r / boost_radius;
                arr[i].angle = Math.atan2(dy, dx);
            } else {
                arr[i].speed = simple_speed;
            }

            var half_w = arr[i].width / 2;
            var half_h = arr[i].height / 2;
            if (arr[i].x < half_w || arr[i].x > cnvs.width - half_w ||
                arr[i].y < half_h || arr[i].y > cnvs.height - half_h) {
                var center_x = cnvs.width / 2;
                var center_y = cnvs.height / 2;
                arr[i].angle = Math.atan2(center_y - arr[i].y, center_x - arr[i].x);
            } else {
                arr[i].angle += small_rotation - 2 * small_rotation * Math.random();
            }
            arr[i].x += arr[i].speed * Math.cos(arr[i].angle);
            arr[i].y += arr[i].speed * Math.sin(arr[i].angle);
        }

        arr[i].draw_cloud();
    }

    requestAnimationFrame(draw);
}

draw();