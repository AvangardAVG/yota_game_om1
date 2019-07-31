class Graphics {
    constructor() { }
    update() {
        cntx.clearRect(0, 0, cnvs.width, cnvs.height);

        barrel.draw_tariff();

        for (var i = 0; i < clouds.length; i++) {
            clouds[i].draw_cloud();
        }

        if (comp_btn.draw_trigger) {
            comp_btn.draw_complete();
        }
    }
}