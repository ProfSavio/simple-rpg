import { Input } from "../systems/Input.js";
import { Camera } from "../systems/Camera.js";
import { NPCManager } from "../systems/NPCManager.js";
import { getRandonChickenSprite } from "../utils/npcConfig.js";
import { World } from "../world/World.js";
import { Player } from "../entities/Player.js";

export class Game {
    constructor() {
        this.width = 500;
        this.height = 350;

        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.world = new World();
        this.player = new Player(100, 100);
        this.camera = new Camera(this.width, this.height);
        this.npcManager = new NPCManager(this.world);
        this.input = new Input();
        
        // Criando galinhas
        this.npcManager.spawnChickenNearPlayer(this.player, getRandonChickenSprite());
        for(let i = 0; i < 48; i++) {
            this.npcManager.spawnChicken(getRandonChickenSprite());
        };

        // Game Loop
        this.lastTime = 0;
    }

    start() {
        requestAnimationFrame(
            (time) => this.gameLoop(time)
        );
    }

    gameLoop(time) {
        const deltaTime = 
            Math.min(
                (time - this.lastTime) / 1000,
                0.05
            );

        this.lastTime = time;

        // Atualizar o jogo
        this.update(deltaTime);

        // Renderiza o jogo
        this.render();

        // Próximo frame
        requestAnimationFrame(
            (time) => this.gameLoop(time)
        );
    }

    update(deltaTime) {
        this.player.update(
            deltaTime,
            this.input,
            this.world
        );

        this.npcManager.update(deltaTime);

        this.camera.follow(this.player, this.world);
    }

    render() {
        this.ctx.clearRect (
            0,
            0,
            this.width,
            this.height
        );

        this.ctx.save();

        this.ctx.translate(
            -this.camera.x,
            -this.camera.y
        );

        this.world.draw(this.ctx);
        this.player.draw(this.ctx);
        this.npcManager.draw(this.ctx);

        this.ctx.restore();
    }
}