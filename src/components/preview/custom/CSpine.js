
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Spine } from "pixi-spine";
import { Sprite } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const SPINE_DISPLAY_OBJECT_NAME = '__spine';

export const behavior = {
    customDisplayObject: () => new Sprite(),
    customApplyProps: (instance, oldProps, newProps) => {

        let spine = instance.getChildByName(SPINE_DISPLAY_OBJECT_NAME);
        if (!spine && newProps.resourceName) {
            // spine = new Spine()
        }

        // instance.texture = newProps.texture;

        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.anchor.set(newProps.anchorX, newProps.anchorY);
        instance.rotation = toRadians(newProps.rotation);
        instance.name = String(newProps.id);
    }
};
export const CSpine = CustomPIXIComponent(behavior, "CSpine");