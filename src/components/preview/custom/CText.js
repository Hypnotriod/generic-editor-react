
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Text } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: () => new Text("", {}),
    customApplyProps: (instance, oldProps, newProps) => {

        const { baseProps, textProps } = newProps;
        const { text, anchorX, anchorY, ...style } = textProps;

        if (style["dropShadowAngle"] !== undefined) {
            style["dropShadowAngle"] = toRadians(style["dropShadowAngle"]);
        };

        instance.text = text;
        instance.style = style;

        instance.visible = baseProps.visible;
        instance.alpha = baseProps.alpha;
        instance.position.set(baseProps.positionX, baseProps.positionY);
        instance.scale.set(baseProps.scaleX, baseProps.scaleY);
        instance.anchor.set(anchorX, anchorY);
        instance.rotation = toRadians(baseProps.rotation);
        instance.name = String(newProps.id);

        if (!instance.interactive) {
            instance.interactive = true;
            instance.on("mousedown", () => {
                newProps.onSelect(newProps.id);
            }, this);
        }
    }
};
export const CText = CustomPIXIComponent(behavior, "CText");