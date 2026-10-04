export class Camera {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height
    }

    follow(target, world) {
        this.x = 
            target.x +
            target.width / 2 -
            this.width / 2

        this.y = 
            target.y +
            target.height / 2 -
            this.height / 2

        const worldWidth = world.width * world.tileSize;
        const worldHeight = world.height * world.tileSize;

        const maxX = worldHeight - world.width;
        const maxY = worldWidth - world.height;

        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    }
}