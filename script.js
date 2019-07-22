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

class cloud {
    constructor(number, type) {
        this.number = number;
        this.type = type;
        this.txt = this.number.toString() + " " + types[type];
        cntx.font = "bold " + simple_font_size + "px sans-serif";
        this.width = cntx.measureText(this.txt).width * cloud_txt_ratio;
        this.height = simple_font_size * cloud_txt_ratio;
        this.x = 0;
        this.y = 0;
        this.new_position();
        this.speed = simple_speed;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed_color = Math.floor(Math.random() * cloud_speed_color.length);
        this.cooldown_color = simple_cooldown;
        this.caught = false;
    }
    new_position() {
        const half_w = this.width / 2;
        const half_h = this.height / 2;
        const w = cnvs_w + this.width;
        const h = cnvs_h + this.height;
        var rand = Math.random() * 2 * (w + h);
        rand -= w;
        if (rand <= 0) {
            this.x = -rand - half_w;
            this.y = -half_h;
        } else {
            rand -= h;
            if (rand <= 0) {
                this.x = w - half_w;
                this.y = -rand - half_h;
            } else {
                rand -= w;
                if (rand <= 0) {
                    this.x = -rand - half_w;
                    this.y = h - half_h;
                } else {
                    rand -= h;
                    this.x = -half_w;
                    this.y = -rand - half_h;
                }
            }
        }
    }
    draw_cloud() {
        cntx.beginPath();

        const half_w = this.width / 2;
        const half_h = this.height / 2;
        const half_PI = Math.PI / 2;
        cntx.arc(this.x - half_w + half_h, this.y, half_h, half_PI, - half_PI);
        cntx.arc(this.x + half_w - half_h, this.y, half_h, - half_PI, half_PI);
        cntx.lineTo(this.x - half_w + half_h, this.y + half_h);
        cntx.fillStyle = cloud_color;
        cntx.fill();

        cntx.strokeStyle = cloud_speed_color[this.speed_color];
        this.cooldown_color--;
        if (this.cooldown_color === 0) {
            this.cooldown_color = this.caught ? fast_cooldown : simple_cooldown;
            this.speed_color++;
            if (this.speed_color === cloud_speed_color.length) {
                this.speed_color = 0;
            }
        }
        cntx.lineWidth = line_width;
        cntx.stroke();

        cntx.closePath();

        cntx.fillStyle = txt_color;
        cntx.font = "bold " + simple_font_size + "px sans-serif";
        cntx.textAlign = "center";
        cntx.textBaseline = "alphabetic";
        cntx.fillText(this.txt, this.x, this.y + txt_y_magic);
    }
}

class counter {
    constructor(type, x, y) {
        this.number = 0;
        this.type = type;
        cntx.font = "bold " + simple_font_size + "px sans-serif";
        this.x = x;
        this.y = y;
        this.btn_x = x;
        this.btn_y = y + btn_rad * 2;
        this.infinity = false;
    }
    draw_counter() {
        cntx.beginPath();
        cntx.arc(this.btn_x, this.btn_y, btn_rad, 0, 2 * Math.PI);
        cntx.fillStyle = btn_color;
        cntx.fill();
        cntx.closePath();

        cntx.beginPath();
        const half_w = minus_w / 2;
        const half_h = minus_h / 2;
        const half_PI = Math.PI / 2;
        cntx.arc(this.btn_x - half_w + minus_rad,
            this.btn_y - half_h + minus_rad,
            minus_rad,
            Math.PI,
            Math.PI + half_PI);
        cntx.arc(this.btn_x + half_w - minus_rad,
            this.btn_y - half_h + minus_rad,
            minus_rad,
            Math.PI + half_PI,
            0);
        cntx.arc(this.btn_x + half_w - minus_rad,
            this.btn_y + half_h - minus_rad,
            minus_rad,
            0,
            half_PI);
        cntx.arc(this.btn_x - half_w + minus_rad,
            this.btn_y + half_h - minus_rad,
            minus_rad,
            half_PI,
            Math.PI);
        cntx.lineTo(this.btn_x - half_w, this.btn_y - half_h + minus_rad);
        cntx.fillStyle = minus_color;
        cntx.fill();
        cntx.closePath();

        const number_txt = this.infinity ? infinity : this.number.toString();

        cntx.fillStyle = txt_color;
        cntx.font = "bold " + simple_font_size + "px sans-serif";
        cntx.textAlign = "center";
        cntx.textBaseline = "alphabetic";
        cntx.fillText(number_txt, this.x, this.y + txt_y_magic);
        const number_txt_measure = cntx.measureText(number_txt);

        cntx.font = "bold " + small_font_size + "px sans-serif";
        cntx.textAlign = "left";
        cntx.textBaseline = "top";
        cntx.fillText(types[this.type], this.x + number_txt_measure.width / 2, this.y - txt_y_magic);
    }
}

class tariff {
    constructor() {
        this.width = adaptive / 5.5;
        this.height = adaptive / 4;
        this.x = cnvs_w / 2;
        this.y = cnvs_h / 2;
        this.yota = new Image();
        this.yota.src = "res/yota.png";
        this.yota_scale = this.width / this.yota.width / 2.5;
        this.yota_width = this.yota.width * this.yota_scale;
        this.yota_height = this.yota.height * this.yota_scale;
        this.yota_x = this.x - this.yota_width / 2;
        this.yota_y = this.y - this.yota_height / 2 - this.height / 7;
        this.min_counter = new counter(min_type, this.x - this.width / 5, this.y + this.height / 5);
        this.gb_counter = new counter(gb_type, this.x + this.width / 5, this.y + this.height / 5);
        this.rad_corner = this.width / 8;
    }
    draw_tariff() {
        this.yota_scale = this.width / this.yota.width / 2.5;
        this.yota_width = this.yota.width * this.yota_scale;
        this.yota_height = this.yota.height * this.yota_scale;
        this.yota_x = this.x - this.yota_width / 2;
        this.yota_y = this.y - this.yota_height / 2 - this.height / 7;

        cntx.beginPath();
        const half_w = this.width / 2;
        const half_h = this.height / 2;
        const half_PI = Math.PI / 2;
        cntx.arc(this.x - half_w + this.rad_corner,
                 this.y - half_h + this.rad_corner,
            this.rad_corner,
                 Math.PI,
            Math.PI + half_PI);
        cntx.arc(this.x + half_w - this.rad_corner,
                 this.y - half_h + this.rad_corner,
            this.rad_corner,
                 Math.PI + half_PI,
                 0);
        cntx.arc(this.x + half_w - this.rad_corner,
                 this.y + half_h - this.rad_corner,
            this.rad_corner,
                 0,
                 half_PI);
        cntx.arc(this.x - half_w + this.rad_corner,
                 this.y + half_h - this.rad_corner,
            this.rad_corner,
                 half_PI,
                 Math.PI);
        cntx.lineTo(this.x - half_w, this.y - half_h + this.rad_corner);
        cntx.fillStyle = tariff_color;
        cntx.fill();
        cntx.closePath();

        cntx.drawImage(this.yota, this.yota_x, this.yota_y, this.yota_width, this.yota_height);

        this.gb_counter.draw_counter();
        this.min_counter.draw_counter();
    }
}

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
                var center_x = cnvs.width / 2;  // TODO: задачка коллизий(вектор направления и центр экрана)
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

onmousemove = function(e) {
    mouse_x = e.pageX - cnvs.offsetLeft;
    mouse_y = e.pageY - cnvs.offsetTop;
};
ontouchmove = function(e) {
    mouse_x = e.pageX - cnvs.offsetLeft;
    mouse_y = e.pageY - cnvs.offsetTop;
};

cnvs.onmousedown = function(e) {
    const mouse_down_x = e.pageX - cnvs.offsetLeft;
    const mouse_down_y = e.pageY - cnvs.offsetTop;

    var dx = tar.gb_counter.btn_x - mouse_down_x;
    var dy = tar.gb_counter.btn_y - mouse_down_y;
    var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < btn_rad) {
        if (tar.gb_counter.infinity) tar.gb_counter.infinity = false;
        if (tar.gb_counter.number - gbs[gb_btn_counter] < 0) {
            tar.gb_counter.number = 0;
        } else {
            tar.gb_counter.number -= gbs[gb_btn_counter];
        }
        gb_btn_timer = btn_timer;
        if (gb_btn_counter !== 3) {
            gb_btn_counter++;
        }
    }

    dx = tar.min_counter.btn_x - mouse_down_x;
    dy = tar.min_counter.btn_y - mouse_down_y;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < btn_rad) {
        if (tar.min_counter.number - mins[min_btn_counter] < 0) {
            tar.min_counter.number = 0;
        } else {
            tar.min_counter.number -= mins[min_btn_counter];
        }
        min_btn_timer = btn_timer;
        if (min_btn_counter !== 3) {
            min_btn_counter++;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(mouse_down_x - arr[i].x) <= arr[i].width / 2 &&
            Math.abs(mouse_down_y - arr[i].y) <= arr[i].height / 2) {
            arr[i].caught = true;
            caught = arr[i];
            break;
        }
    }
};

cnvs.ontouchstart = function(e) {
    const mouse_down_x = e.pageX - cnvs.offsetLeft;
    const mouse_down_y = e.pageY - cnvs.offsetTop;

    var dx = tar.gb_counter.btn_x - mouse_down_x;
    var dy = tar.gb_counter.btn_y - mouse_down_y;
    var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < btn_rad) {
        if (tar.gb_counter.infinity) tar.gb_counter.infinity = false;
        if (tar.gb_counter.number - gbs[gb_btn_counter] < 0) {
            tar.gb_counter.number = 0;
        } else {
            tar.gb_counter.number -= gbs[gb_btn_counter];
        }
        gb_btn_timer = btn_timer;
        if (gb_btn_counter !== 3) {
            gb_btn_counter++;
        }
    }

    dx = tar.min_counter.btn_x - mouse_down_x;
    dy = tar.min_counter.btn_y - mouse_down_y;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < btn_rad) {
        if (tar.min_counter.number - mins[min_btn_counter] < 0) {
            tar.min_counter.number = 0;
        } else {
            tar.min_counter.number -= mins[min_btn_counter];
        }
        min_btn_timer = btn_timer;
        if (min_btn_counter !== 3) {
            min_btn_counter++;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(mouse_down_x - arr[i].x) <= arr[i].width / 2 &&
            Math.abs(mouse_down_y - arr[i].y) <= arr[i].height / 2) {
            arr[i].caught = true;
            caught = arr[i];
            break;
        }
    }
};

cnvs.onmouseleave = function() {
    caught.caught = false;
    caught = null;
};

cnvs.onmouseup = function(e) {
    if (caught != null) {
        const mouse_up_x = e.pageX - cnvs.offsetLeft;
        const mouse_up_y = e.pageY - cnvs.offsetTop;
        if (mouse_up_x - tar.x > -tar.width / 2 && mouse_up_x - tar.x < tar.width / 2 &&
            mouse_up_y - tar.y > -tar.height / 2 && mouse_up_y - tar.y < tar.height / 2) {
            if (caught.type === gb_type) {
                if (tar.gb_counter.number + caught.number > 50) {
                    tar.gb_counter.number = 51;
                    tar.gb_counter.infinity = true;
                } else {
                    tar.gb_counter.number += caught.number;
                }
            } else {
                if (tar.min_counter.number + caught.number > 2000) {
                    tar.min_counter.number = 2000;
                } else {
                    tar.min_counter.number += caught.number;
                }
            }
            caught.new_position();
        }
        caught.caught = false;
        caught = null;
    }
};

cnvs.ontouchend = function (e) {
    if (caught != null) {
        const mouse_up_x = e.pageX - cnvs.offsetLeft;
        const mouse_up_y = e.pageY - cnvs.offsetTop;
        if (mouse_up_x - tar.x > -tar.width / 2 && mouse_up_x - tar.x < tar.width / 2 &&
            mouse_up_y - tar.y > -tar.height / 2 && mouse_up_y - tar.y < tar.height / 2) {
            if (caught.type === gb_type) {
                if (tar.gb_counter.number + caught.number > 50) {
                    tar.gb_counter.number = 51;
                    tar.gb_counter.infinity = true;
                } else {
                    tar.gb_counter.number += caught.number;
                }
            } else {
                if (tar.min_counter.number + caught.number > 2000) {
                    tar.min_counter.number = 2000;
                } else {
                    tar.min_counter.number += caught.number;
                }
            }
            caught.new_position();
        }
        caught.caught = false;
        caught = null;
    }
};


var gb_btn_counter = 0;
var gb_btn_timer = 0;
var min_btn_counter = 0;
var min_btn_timer = 0;
var mouse_x = null;
var mouse_y = null;
var caught = null;

cnvs.setAttribute('width', cnvs_w);
cnvs.setAttribute('height', cnvs_h);

var tar = new tariff();

const arr = [
    new cloud(gbs[0], gb_type),
    new cloud(gbs[1], gb_type),
    new cloud(gbs[2], gb_type),
    new cloud(gbs[3], gb_type),
    new cloud(mins[0], min_type),
    new cloud(mins[1], min_type),
    new cloud(mins[2], min_type),
    new cloud(mins[3], min_type)
];

draw();