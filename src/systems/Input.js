export class Input {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.setupListeners();
    }

    // Eventos do teclado
    setupListeners() {
        window.addEventListener(
            "keydown",
            (event) => this.handleKeyDown(event)
        );

        window.addEventListener(
            "keyup",
            (event) => this.handleKeyUp(event)
        );
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();

        switch(key) {
            case "w":
            case "arrowup":
                this.up = true;
                break;

            case "s":
            case "arrowdown":
                this.down = true;
                break;

            case "a":
            case "arrowleft":
                this.left = true;
                break;

            case "d":
            case "arrowright":
                this.right = true;
                break;
        }
    }

    handleKeyUp(event) {
        const key = event.key.toLowerCase();

        switch(key) {
            case "w":
            case "arrowup":
                this.up = false;
                break;

            case "s":
            case "arrowdown":
                this.down = false;
                break;

            case "a":
            case "arrowleft":
                this.left = false;
                break;

            case "d":
            case "arrowright":
                this.right = false;
                break;
        }
    }
}