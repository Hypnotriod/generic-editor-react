import { Container, Graphics } from "pixi.js";

export class ViewElementBounds {
    constructor() {
        this.view = new Container();
        this._bounds = new Graphics();
        this.view.addChild(this._bounds);
    }

    show() {
        this.view.visible = true;
    }

    hide() {
        this.view.visible = false;
    }

    setPosition(point) {
        this.view.x = point.x;
        this.view.y = point.y;
    }

    setRotation(angle) {
        this._bounds.rotation = angle;
    }

    adjustBounds(element, cameraScale) {
        this._bounds.clear();

        const x = element._localBoundsRect ? element._localBoundsRect.x : (element.anchor !== undefined ? -element.width * element.anchor.x : 0);
        const y = element._localBoundsRect ? element._localBoundsRect.y : (element.anchor !== undefined ? -element.width * element.anchor.y : 0);
        const width = (element.scale ? element.width * (element.scale.x < 0 && element.width > 0 ? -1 : 1) : element.width) * cameraScale;
        const height = (element.scale ? element.height * (element.scale.y < 0 && element.height > 0 ? -1 : 1) : element.height) * cameraScale;

        this._bounds.lineStyle(5, 0xff0000)
            .moveTo(x, y)
            .lineTo(x + width, y)
            .lineTo(x + width, y + height)
            .lineTo(x, y + height)
            .lineTo(x, y)
            .endFill();
    }
}
