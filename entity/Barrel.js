class Barrel {
    constructor() {
        this.width = adaptive / 6;
        this.height = adaptive / 10;
        this.x = cnvs_w / 2;
        this.y = cnvs_h - this.height / 2 - 2 * big_font_size * cloud_txt_ratio;
        this.min_counter = new Counter(min_type, this.x - this.width / 4, this.y);
        this.gb_counter = new Counter(gb_type, this.x + this.width / 4, this.y);
        this.rad_corner = this.width / 8;
    }
    draw_tariff() {
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

        this.gb_counter.draw_counter();
        this.min_counter.draw_counter();
    }
    change_pos(x, y) {
        this.x = x;
        this.y = y;
        this.min_counter.change_pos(x - this.width / 4, y);
        this.gb_counter.change_pos(x + this.width / 4, y);
    }
}