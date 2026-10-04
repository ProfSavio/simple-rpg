export class Collision {
    // Verificar colisção das entidades com o mapa
    static checkWorld(player, world) {
        const left = Math.floor(player.x / world.tileSize);
        const right = Math.floor((player.x + player.width -1) / world.tileSize);
        const top = Math.floor(player.y / world.tileSize);
        const bottom = Math.floor((player.y + player.height -1) / world.tileSize);

        for(let y = top; y <= bottom; y++) {
            for(let x = left; x <= right; x++) {
                if(world.isSolid(x, y)) {
                    return true;
                }
            }
        }

        return false;
    }
}