function on_mousemove(e) {
    if (movement) {
        tar.x = e.clientX - cnvs.offsetLeft;
        tar.yota_x = tar.x - tar.yota_width / 2;
        tar.gb_counter.x = tar.x + tar.width / 5;
        tar.gb_counter.btn_x = tar.x + tar.width / 5;
        tar.min_counter.x = tar.x - tar.width / 5;
        tar.min_counter.btn_x = tar.x - tar.width / 5;
    }
}

function on_touchmove(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var mouse_event = new MouseEvent("mousemove", {
        clientX: touch.clientX
    });
    dispatchEvent(mouse_event);
}

function cnvs_on_mousedown(e) {
    const mouse_down_x = e.clientX - cnvs.offsetLeft;
    const mouse_down_y = e.clientY - cnvs.offsetTop;

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

    if (mouse_down_x - tar.x > -tar.width / 2 && mouse_down_x - tar.x < tar.width / 2 &&
        mouse_down_y - tar.y > -tar.height / 2 && mouse_down_y - tar.y < tar.height / 2) {
        movement = true;
    }

    if (caught) {
        if (mouse_down_x - yb.x > -yb.width / 2 && mouse_down_x - yb.x < yb.width / 2 &&
            mouse_down_y - yb.y > -yb.height / 2 && mouse_down_y - yb.y < yb.height / 2) {
            var url = "https://www.yota.ru/voice?min=" + tar.min_counter.number.toString() + "&gb=";
            url += (tar.gb_counter.infinity) ? ("un") : (tar.gb_counter.number.toString());
            window.open(url);
        }
    }
}

function cnvs_on_touchstart(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var mouse_event = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    cnvs.dispatchEvent(mouse_event);
}

function cnvs_on_mouseleave() {
    movement = false;
}

function cnvs_on_mouseup() {
    movement = false;
}

function cnvs_on_touchend(e) {
    e.preventDefault();
    var mouse_event = new MouseEvent("mouseup", { });
    cnvs.dispatchEvent(mouse_event);
}
