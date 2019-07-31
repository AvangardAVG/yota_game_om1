class Logic {
    constructor() { }
    update() {
        barrel.gb_counter.decrement_update();
        barrel.min_counter.decrement_update();
        for (var i = 0; i < clouds.length; i++) {
            clouds[i].y += clouds[i].speed;

            if (clouds[i].x - barrel.x > -barrel.width / 2 && clouds[i].x - barrel.x < barrel.width / 2 &&
                clouds[i].y - barrel.y > -barrel.height / 2 && clouds[i].y - barrel.y < barrel.height / 2) {
                if (clouds[i].type === gb_type) {
                    if (barrel.gb_counter.number + clouds[i].number > max_gbs) {
                        barrel.gb_counter.number = max_gbs + gbs[0];
                        barrel.gb_counter.infinity = true;
                    } else {
                        barrel.gb_counter.number += clouds[i].number;
                    }
                } else {
                    if (barrel.min_counter.number + clouds[i].number > max_mins) {
                        barrel.min_counter.number = max_mins;
                    } else {
                        barrel.min_counter.number += clouds[i].number;
                    }
                }
                clouds[i].recreate_cloud();
                comp_btn.draw_trigger = true;
            }

            if (clouds[i].y > cnvs.height + clouds[i].height / 2) {
                clouds[i].recreate_cloud();
            }
        }
    }
}