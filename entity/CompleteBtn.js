class CompleteBtn {
    constructor() {
        this.txt = "Готово";
        cntx.font = "bold " + big_font_size + "px sans-serif";
        this.width = cntx.measureText(this.txt).width * cloud_txt_ratio;
        this.height = big_font_size * cloud_txt_ratio;
        this.x = cnvs_w / 2;
        this.y = cnvs_h - this.height;
        this.draw_trigger = false;
    }
    draw_complete() {
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
        cntx.font = "bold " + big_font_size + "px sans-serif";
        cntx.textAlign = "center";
        cntx.textBaseline = "alphabetic";
        cntx.fillText(this.txt, this.x, this.y + big_font_size / 3);
    }
}