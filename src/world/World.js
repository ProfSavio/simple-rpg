import { Tile } from "./Tile.js";

export class World {
    constructor() {
        this.tileSize = 32;

        this.width = 100;
        this.height = 100;

        this.grassImage = new Image();
        this.grassImage.src =
            "assets/tiles/grass_with_background.png";

        this.rockImage = new Image();
        this.rockImage.src =
            "assets/tiles/rock.png";

        this.outOfBoundsTile =
            new Tile(
                1,
                this.rockImage
            );

        this.map =
            this.createMap();
    }

    createMap() {
        const map = [];
        for (let y = 0; y < this.height; y++
        ) {
            const row = [];
            for (let x = 0; x < this.width; x++
            ) {
                let type = 0;

                // Bordas do mapa
                if (
                    x === 0 ||
                    y === 0 ||
                    x === this.width - 1 ||
                    y === this.height - 1
                ) {
                    type = 1;
                }

                // Obstáculos horizontais
                if (
                    y === 10 &&
                    x >= 5 &&
                    x <= 25
                ) {
                    type = 1;
                }

                if (
                    y === 20 &&
                    x >= 15 &&
                    x <= 40
                ) {
                    type = 1;
                }

                if (
                    y === 30 &&
                    x >= 5 &&
                    x <= 30
                ) {
                    type = 1;
                }

                // Obstáculos verticais
                if (
                    x === 15 &&
                    y >= 10 &&
                    y <= 20
                ) {
                    type = 1;
                }

                if (
                    x === 40 &&
                    y >= 20 &&
                    y <= 40
                ) {
                    type = 1;
                }

                if (
                    x === 55 &&
                    y >= 5 &&
                    y <= 30
                ) {
                    type = 1;
                }

                row.push(
                    new Tile(
                        type,
                        type === 1
                            ? this.rockImage
                            : this.grassImage
                    )
                );
            }

            map.push(row);
        }

        return map;
    }

    getTile(x, y) {
        if (
            x < 0 ||
            y < 0 ||
            x >= this.width ||
            y >= this.height
        ) {
            return this.outOfBoundsTile;
        }

        return this.map[y][x];
    }

    isSolid(x, y) {
        return this
            .getTile(x, y)
            .solid;
    }

    draw(ctx) {
        for ( let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this.getTile(x, y);

                tile.draw(
                    ctx,
                    x,
                    y,
                    this.tileSize
                );
            }
        }
    }
}