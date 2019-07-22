function on_mousemove(e) {
    mouse_x = e.clientX - cnvs.offsetLeft;
    mouse_y = e.clientY - cnvs.offsetTop;
}

function on_touchmove(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var mouse_event = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
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

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(mouse_down_x - arr[i].x) <= arr[i].width / 2 &&
            Math.abs(mouse_down_y - arr[i].y) <= arr[i].height / 2) {
            arr[i].caught = true;
            caught = arr[i];
            break;
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
    mouse_x = touch.clientX;
    mouse_y = touch.clientY;
    cnvs.dispatchEvent(mouse_event);
}

function cnvs_on_mouseleave() {
    caught.caught = false;
    caught = null;
}

function cnvs_on_mouseup(e) {
    if (caught != null) {
        const mouse_up_x = e.clientX - cnvs.offsetLeft;
        const mouse_up_y = e.clientY - cnvs.offsetTop;
        if (mouse_up_x - tar.x > -tar.width / 2 && mouse_up_x - tar.x < tar.width / 2 &&
            mouse_up_y - tar.y > -tar.height / 2 && mouse_up_y - tar.y < tar.height / 2) {
            if (caught.type === gb_type) {
                if (tar.gb_counter.number + caught.number > 50) {
                    tar.gb_counter.number = 51;
                    tar.gb_counter.infinity = true;
                } else {
                    tar.gb_counter.number += caught.number;
                }
            } else {
                if (tar.min_counter.number + caught.number > 2000) {
                    tar.min_counter.number = 2000;
                } else {
                    tar.min_counter.number += caught.number;
                }
            }
            caught.new_position();
        }
        caught.caught = false;
        caught = null;
    }
}

function cnvs_on_touchend(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var mouse_event = new MouseEvent("mouseup", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    mouse_x = touch.clientX;
    mouse_y = touch.clientY;
    cnvs.dispatchEvent(mouse_event);
}