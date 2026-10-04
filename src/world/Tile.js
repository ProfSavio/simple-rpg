export class Tile {
    constructor(type, image) {
        this.type = type;
        this.solid = type === 1;
        this.image = image;
    }

    draw(ctx, x, y, size) {
        if (!this.image.complete) {
            return;
        }

        ctx.drawImage(
            this.image,
            x * size,
            y * size,
            size,
            size
        );
    }
}

// if(this.type === 1) {
//     ctx.fillStyle = "#555";
// } else {
//     ctx.fillStyle = "#222";
// }

// ctx.fillRect(
//     x * size,
//     y * size,
//     size,
//     size
// )