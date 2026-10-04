export class Animation {
    constructor(image, columns, rows, frameDuration) {
        this.image = image;
        this.columns = columns;
        this.rows = rows;
        this.frameCount = columns;
        this.frameDuration = frameDuration;

        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;

        if(this.elapsedTime >= this.frameDuration) {
            this.elapsedTime = 0;
            this.currentFrame++;
            if(this.currentFrame >= this.columns) {
                this.currentFrame = 0;
            }
        }
    }

    reset() {
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    updateForward(deltaTime) {
        this.elapsedTime += deltaTime;

        if(this.elapsedTime >= this.frameDuration) {
            this.elapsedTime = 0;

            if(this.currentFrame < this.frameCount - 1) {
                this.currentFrame++;
            }
        }
    }

    updateBackward(deltaTime) {
        this.elapsedTime += deltaTime;

        if(this.elapsedTime >= this.frameDuration) {
            this.elapsedTime = 0;

            if(this.currentFrame) {
                this.currentFrame--;
            }
        }
    }

    draw(ctx, x, y, width, height, row, flipX = false) {
        const frameWidth = this.image.width / this.columns;
        const frameHeight = this.image.height / this.rows;
        const sourceX = this.currentFrame * frameWidth;
        const sourceY = row * frameHeight;

        ctx.save();

        if(flipX) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(x, y);
        }
        
        ctx.drawImage(
            this.image,

            // Recorte da Sprite Sheet
            sourceX,
            sourceY,
            frameWidth,
            frameHeight,
            
            // Posição na tela
            0,
            0,

            // Tamanho do player
            width,
            height
        );
        
        ctx.restore();
        
    }
}