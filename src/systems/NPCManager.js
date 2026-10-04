import { Chicken } from "../entities/Chicken.js";

export class NPCManager {
    constructor(world) {
        this.world = world;
        this.npcs = [];
    }

    spawn(NPCClass, options = {}) {
        const position = options.position ?? this.findRandomPosition();
        const npc = new NPCClass(
            position.x,
            position.y,
            options.spritePath
        );

        this.npcs.push(npc);

        return npc;
    }

    spawnChicken(spritePath) {
        return this.spawn(Chicken, {
            spritePath
        });
    }

    spawnChickenNearPlayer(player, spritePath) {
        const distance = 3;
        const tileX = Math.floor(player.x / this.world.tileSize);
        const tileY = Math.floor(player.y / this.world.tileSize);
        const x = tileX + distance;
        const y = tileY;

        if(this.world.isSolid(x, y)) {
            return null;
        }

        return this.spawn(Chicken, {
            spritePath,
            position: {
                x: x * this.world.tileSize,
                y: y * this.world.tileSize
            }
        });
    }

    findRandomPosition() {
        let x;
        let y;

        do {
            x = Math.floor(Math.random() * this.world.width);
            y = Math.floor(Math.random() * this.world.height);
        } while (
            this.world.isSolid(x,y)
        );

        return {
            x: x * this.world.tileSize,
            y: y * this.world.tileSize
        };
    }

    update(deltaTime) {
        for(const npc of this.npcs) {
            npc.update(deltaTime, this.world);
        }
    }

    draw(ctx) {
        for(const npc of this.npcs) {
            npc.draw(ctx);
        }
    }
}