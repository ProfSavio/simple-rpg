import { Collision } from "../systems/Collision.js";
import { Animation } from "../systems/Animation.js";

export class Player {
    constructor(x, y) {
        // Posição
        this.x = x;
        this.y = y;

        // Dimensões
        this.width = 32;
        this.height = 32;

        // Movimento
        this.speed = 180;

        this.image = new Image();
        this.image.src = "../../assets/character/clebinho.png";
        this.animation = new Animation(
            this.image,
            4,
            4,
            0.12
        );
        this.direction = "down";
        this.isMoving = false;
    }

    update(deltaTime, input, world) {
        this.isMoving = false;
        let directionX = 0;
        let directionY = 0;

        if(input.left) {
            directionX -= 1;
            this.direction = "left";
            this.isMoving = true;
        }
        if(input.right) {
            directionX += 1;
            this.direction = "right";
            this.isMoving = true;
        }
        if(input.up) {
            directionY -= 1;
            this.direction = "up";
            this.isMoving = true;
        }
        if(input.down) {
            directionY += 1;
            this.direction = "down";
            this.isMoving = true;
        }

        // Normalização do movimento diagonal
        if(directionX !== 0 && directionY !== 0) {
            const lenght = 
                Math.sqrt(
                    directionX * directionX + 
                    directionY * directionY 
                );
            
            directionX /= lenght;
            directionY /= lenght;
        }

        // Atualizar posição e verificar colisão
        const movementX =
            directionX *
            this.speed *
            deltaTime;

        const movementY =
            directionY *
            this.speed *
            deltaTime;

        this.x += movementX;
        if(Collision.checkWorld(this, world)) {
            this.x -= movementX;
        }

        this.y += movementY;
        if(Collision.checkWorld(this, world)) {
            this.y -= movementY;
        }

        if(this.isMoving) {
            this.animation.update(deltaTime);
        } else {
            this.animation.reset();
        }
    }

    draw(ctx) {
        this.animation.draw(
            ctx,
            this.x,
            this.y,
            this.width,
            this.height,
            this.getAnimationRow()
        );
    }

    getAnimationRow() {
        switch(this.direction) {
            case "up":
                return 1;
            case "left":
                return 2;
            case "right":
                return 3;
            case "down":
            default:
                return 0;
        }
    }
}