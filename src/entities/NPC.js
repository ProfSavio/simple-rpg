import { Collision } from "../systems/Collision.js";

export class NPC {
    constructor(x, y, width = 32, height = 32) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.direction = "down";
        this.isMoving = false;

        this.speed = 40;
    }

    move(directionX, directionY, deltaTime, world) {
        if(
            directionX == 0 && 
            directionY == 0
        ) {
            return;
        }

        const length = Math.hypot(directionX, directionY);

        directionX /= length;
        directionY /= length;

        const movementX = directionX * this.speed * deltaTime;
        const movementY = directionY * this.speed * deltaTime;

        this.x += movementX;
        if(Collision.checkWorld(this, world)) {
            this.x -= movementX;
        }

        this.y += movementY;
        if(Collision.checkWorld(this, world)) {
            this.y -= movementY;
        }
    }

    draw(ctx) {

    }

    update(deltaTime, world) {
        
    }
}