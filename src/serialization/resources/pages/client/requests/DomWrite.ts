/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Webflow from "../../../../../api/index";
import * as core from "../../../../../core";
import { DomWriteNodesItem } from "../../types/DomWriteNodesItem";

export const DomWrite: core.serialization.Schema<
    serializers.DomWrite.Raw,
    Omit<Webflow.DomWrite, "locale">
> = core.serialization.object({
    nodes: core.serialization.list(DomWriteNodesItem),
});

export declare namespace DomWrite {
    interface Raw {
        nodes: DomWriteNodesItem.Raw[];
    }
}
