
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Sprite, Rectangle } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: () => new Sprite(),
    customApplyProps: (instance, oldProps, newProps) => {

        instance.texture = newProps.texture;

        instance.visible = newProps.visible;
        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.anchor.set(newProps.anchorX, newProps.anchorY);
        instance.rotation = toRadians(newProps.rotation);
        instance.name = String(newProps.id);

        if (!instance.interactive) {
            instance.interactive = true;
            instance.on("mousedown", () => {
                newProps.onSelect(newProps.id);
            }, this);
        }
    }
};
export const CSprite = CustomPIXIComponent(behavior, "CSprite");