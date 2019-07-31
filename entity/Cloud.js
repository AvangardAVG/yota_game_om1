class Cloud {
    constructor() {
        this.number = null;
        this.type = null;
        this.txt = null;
        cntx.font = null;
        this.width = null;
        this.height = null;
        this.x = null;
        this.y = null;
        this.speed = null;
        this.recreate_cloud();
    }
    recreate_cloud() {
        const half_w = this.width / 2;
        const half_h = this.height / 2;
        const w = cnvs_w - this.width;
        this.type = Math.round(Math.random());
        if (this.type === gb_type) {
            this.number = gbs[Math.floor(Math.random() * (gbs.length - 0.001))];
        } else {
            this.number = mins[Math.floor(Math.random() * (mins.length - 0.001))];
        }
        this.txt = this.number.toString() + " " + types[this.type];
        cntx.font = "bold " + middle_font_size + "px sans-serif";
        this.width = cntx.measureText(this.txt).width * cloud_txt_ratio;
        this.height = middle_font_size * cloud_txt_ratio;
        this.x = Math.random() * w + half_w;
        this.y = -half_h;
        this.speed = simple_speed * (min_boost + Math.random() * max_boost);
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

        cntx.closePath();

        cntx.fillStyle = txt_color;
        cntx.font = "bold " + middle_font_size + "px sans-serif";
        cntx.textAlign = "center";
        cntx.textBaseline = "alphabetic";
        cntx.fillText(this.txt, this.x, this.y + middle_font_size / 3);
    }
}