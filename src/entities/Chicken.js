import { NPC } from "./NPC.js";
import { Animation } from "../systems/Animation.js";

export class Chicken extends NPC {

    constructor(x, y, spritePath) {
        super(x, y, 32, 32);

        this.speed = 40;
        this.image = new Image();
        this.image.src = spritePath;

        this.state = "walking";

        this.directionX = 0;
        this.directionY = 0;

        this.stateTimer = 0;
        this.restingPhase = "forward";

        this.animations = {

            walking:
                new Animation(
                    this.image,
                    4,
                    4,
                    0.15
                ),

            eating:
                new Animation(
                    this.image,
                    4,
                    4,
                    0.20
                ),

            resting:
                new Animation(
                    this.image,
                    4,
                    4,
                    0.30
                ),

            running:
                new Animation(
                    this.image,
                    4,
                    4,
                    0.08
                )
        };

        this.animation =
            this.animations.walking;

        this.chooseNewBehavior();
    }

    chooseNewBehavior() {

        const behaviors = [
            "walking",
            "eating",
            "resting",
            "running"
        ];

        const randomIndex =
            Math.floor(
                Math.random() *
                behaviors.length
            );

        this.state =
            behaviors[randomIndex];

        if (this.state === "resting") {
            this.restingPhase = "forward";
        } else {
            this.restingPhase = null;
        }

        this.animations[this.state].reset();

        if(this.state === "resting") {
            this.stateTimer =
                3 +
                Math.random() * 2;
        } else {
            this.stateTimer =
                1 +
                Math.random() * 3;
        }
        
        this.directionX = 0;
        this.directionY = 0;

        if (
            this.state === "walking" ||
            this.state === "running"
        ) {

            const directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];

            const randomDirection =
                directions[
                    Math.floor(
                        Math.random() *
                        directions.length
                    )
                ];

            this.directionX =
                randomDirection[0];

            this.directionY =
                randomDirection[1];

            this.updateDirection();
        }
    }

    updateDirection() {

        if (this.directionX < 0) {
            this.direction = "left";
        }

        if (this.directionX > 0) {
            this.direction = "right";
        }

        if (this.directionY < 0) {
            this.direction = "up";
        }

        if (this.directionY > 0) {
            this.direction = "down";
        }
    }

    update(deltaTime, world) {

        this.stateTimer -= deltaTime;

        if (
            this.state !== "resting" &&
            this.stateTimer <= 0
        ) {
            this.chooseNewBehavior();
        }

        this.animation =
            this.animations[this.state];

        this.isMoving =
            this.state === "walking" ||
            this.state === "running";

        if (this.isMoving) {

            if (this.state === "running") {
                this.speed = 70;
            } else {
                this.speed = 40;
            }

            this.move(
                this.directionX,
                this.directionY,
                deltaTime,
                world
            );
        }

        if (this.state === "resting") {

            const animationDuration =
                (this.animation.frameCount - 1) *
                this.animation.frameDuration;

            if (
                this.restingPhase === "forward"
            ) {

                this.animation.updateForward(
                    deltaTime
                );

                if (
                    this.animation.currentFrame ===
                    this.animation.frameCount - 1
                ) {
                    this.restingPhase =
                        "waiting";
                }

            } else if (
                this.restingPhase === "waiting"
            ) {

                if (
                    this.stateTimer <=
                    animationDuration
                ) {
                    this.restingPhase =
                        "backward";
                }

            } else if (
                this.restingPhase === "backward"
            ) {

                this.animation.updateBackward(
                    deltaTime
                );

                if (
                    this.animation.currentFrame === 0
                ) {
                    this.chooseNewBehavior();
                }
            }

        } else {

            this.animation.update(
                deltaTime
            );
        }
    }

    draw(ctx) {

        if (!this.image.complete) {
            return;
        }

        const row =
            this.getAnimationRow();
  
        this.animation.draw(
            ctx,
            this.x,
            this.y,
            this.width,
            this.height,
            row,
            this.direction === "right"
        );
    }

    getAnimationRow() {

        switch (this.state) {

            case "walking":
                return 0;

            case "eating":
                return 1;

            case "resting":
                return 2;

            case "running":
                return 3;

            default:
                return 0;
        }
    }
}