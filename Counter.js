class Counter {
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