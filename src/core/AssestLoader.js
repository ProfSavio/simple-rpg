export class AssetLoader {
    static loadImage(src) {
        return new Promise(
            (resolve, reject) => {
                const image = new Image();

                image.onload = () => {
                    resolve(image);
                };

                image.onerror = () => {
                    reject(
                        new Error(
                            `Erro ao carregar ${src}`
                        )
                    );
                };

                image.src = src;
            }
        );
    }
}