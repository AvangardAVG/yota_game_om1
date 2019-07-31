class Counter {
    constructor(type, x, y) {
        this.number = 0;
        this.type = type;
        this.x = null;
        this.y = null;
        this.change_pos(x, y);
        this.infinity = false;
        this.dec_timer = 0;
        this.dec_counter = 0;
        this.h = btn_rad * 2 + big_font_size;
        const space = this.h / 8;
        this.h += space;
        this.txt_x = null;
        this.txt_y = null;
        this.btn_x = null;
        this.btn_y = null;
    }
    draw_counter() {
        this.txt_x = this.x;
        this.txt_y = this.y - this.h / 2 + big_font_size / 2;
        this.btn_x = this.x;
        this.btn_y = this.y + this.h / 2 - btn_rad;

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
        cntx.font = "bold " + big_font_size + "px sans-serif";
        cntx.textAlign = "center";
        cntx.textBaseline = "alphabetic";
        cntx.fillText(number_txt, this.txt_x, this.txt_y + big_font_size / 3);
        const number_txt_measure = cntx.measureText(number_txt);

        cntx.font = "bold " + small_font_size + "px sans-serif";
        cntx.textAlign = "left";
        cntx.textBaseline = "top";
        cntx.fillText(types[this.type], this.txt_x + number_txt_measure.width / 2, this.txt_y - big_font_size / 3);
    }
    change_pos(x, y) {
        this.x = x;
        this.y = y;
    }
    decrement_update() {
        if (this.dec_timer !== 0) {
            this.dec_timer--;
        } else {
            this.dec_counter = 0;
        }
    }
    decrement() {
        if (this.infinity) this.infinity = false;
        if (this.number - (this.type === gb_type ? gbs[this.dec_counter] : mins[this.dec_counter]) < 0) {
            this.number = 0;
        } else {
            this.number -= this.type === gb_type ? gbs[this.dec_counter] : mins[this.dec_counter];
        }
        this.dec_timer = dec_time;
        if (this.dec_counter !== (this.type === gb_type ? gbs.length : mins.length) - 1) {
            this.dec_counter++;
        }
    }
}