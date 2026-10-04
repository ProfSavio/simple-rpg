export const chickenSprites = [
    "assets/npcs/chicken/Chicken_Sprite_Sheet_Black.png",
    "assets/npcs/chicken/Chicken_Sprite_Sheet_Dark_Brown.png",
    "assets/npcs/chicken/Chicken_Sprite_Sheet_Light_Brown.png",
    "assets/npcs/chicken/Chicken_Sprite_Sheet.png"
];

export function getRandonChickenSprite() {
    const index = Math.floor(Math.random() * chickenSprites.length);
    return chickenSprites[index];
}