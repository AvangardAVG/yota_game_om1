cnvs.setAttribute('width', cnvs_w);
cnvs.setAttribute('height', cnvs_h);

onmousemove = on_mousemove;
ontouchmove = on_touchmove;
cnvs.onmousedown = cnvs_on_mousedown;
cnvs.ontouchstart = cnvs_on_touchstart;
cnvs.onmouseleave = cnvs_on_mouseleave;
cnvs.onmouseup = cnvs_on_mouseup;
cnvs.ontouchend = cnvs_on_touchend;

var caught = false;
var movement = false;

var game_loop = new GameLoop();
var logic = new Logic();
var graphics = new Graphics();

var barrel = new Barrel();
var comp_btn = new CompleteBtn();
var clouds = [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud()
];

game_loop.start();