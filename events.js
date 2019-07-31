function on_mousemove(e) {
    if (movement) {
        barrel.change_pos(e.clientX - cnvs.offsetLeft, barrel.y);
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

    if (Math.sqrt(Math.pow(mouse_down_x - barrel.min_counter.btn_x, 2) + Math.pow(mouse_down_y - barrel.min_counter.btn_y, 2)) < btn_rad) {
        barrel.min_counter.decrement();
    } else {
        if (Math.sqrt(Math.pow(mouse_down_x - barrel.gb_counter.btn_x, 2) + Math.pow(mouse_down_y - barrel.gb_counter.btn_y, 2)) < btn_rad) {
            barrel.gb_counter.decrement();
        } else {
            if (mouse_down_x - barrel.x > -barrel.width / 2 && mouse_down_x - barrel.x < barrel.width / 2 &&
                mouse_down_y - barrel.y > -barrel.height / 2 && mouse_down_y - barrel.y < barrel.height / 2) {
                movement = true;
            }
        }
    }

    if (comp_btn.draw_trigger) {
        if (mouse_down_x - comp_btn.x > -comp_btn.width / 2 && mouse_down_x - comp_btn.x < comp_btn.width / 2 &&
            mouse_down_y - comp_btn.y > -comp_btn.height / 2 && mouse_down_y - comp_btn.y < comp_btn.height / 2) {
            var url = "https://www.yota.ru/voice?min=" + barrel.min_counter.number.toString() + "&gb=";
            url += (barrel.gb_counter.infinity) ? ("un") : (barrel.gb_counter.number.toString());
            url += "&utm_source=om1&utm_medium=pr&utm_campaign=anyyota&utm_term=jul-19&utm_content=specproekt";
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
