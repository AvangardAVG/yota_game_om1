class Tariff {
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
        this.min_counter = new Counter(min_type, this.x - this.width / 5, this.y + this.height / 5);
        this.gb_counter = new Counter(gb_type, this.x + this.width / 5, this.y + this.height / 5);
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