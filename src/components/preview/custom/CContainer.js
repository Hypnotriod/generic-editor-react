
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Container } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: () => new Container(),
    customApplyProps: (instance, oldProps, newProps) => {
        instance.visible = newProps.visible;
        instance.alpha = newProps.alpha;
        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.rotation = toRadians(newProps.rotation);
        instance.name = String(newProps.id);
    }
};
export const CContainer = CustomPIXIComponent(behavior, "CContainer");