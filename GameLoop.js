class GameLoop {
    constructor() {
        this.previous_timestamp = 0;
        this.time_lag = 0;
    }
    start() {
        requestAnimationFrame(this.loop);
    }
    loop(timestamp) {
        game_loop.time_lag += timestamp - game_loop.previous_timestamp;
        while (game_loop.time_lag >= time_per_update) {
            logic.update();
            game_loop.time_lag -= time_per_update;
        }
        graphics.update();
        game_loop.previous_timestamp = timestamp;
        requestAnimationFrame(game_loop.loop);
    }
}