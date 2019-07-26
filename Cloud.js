class Cloud {
    constructor(number, type) {
        this.number = number;
        this.type = type;
        this.txt = this.number.toString() + " " + types[type];
        cntx.font = "bold " + simple_font_size + "px sans-serif";
        this.width = cntx.measureText(this.txt).width * cloud_txt_ratio;
        this.height = simple_font_size * cloud_txt_ratio;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.new_position();
        this.speed_color = Math.floor(Math.random() * cloud_speed_color.length);
        this.cooldown_color = simple_cooldown;
    }
    new_position() {
        const half_w = this.width / 2;
        const half_h = this.height / 2;
        const w = cnvs_w - this.width;
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

        cntx.strokeStyle = cloud_speed_color[this.speed_color];
        this.cooldown_color--;
        if (this.cooldown_color === 0) {
            this.cooldown_color = simple_cooldown;
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