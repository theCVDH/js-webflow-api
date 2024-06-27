/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Webflow from "../../../../../api/index";
import * as core from "../../../../../core";

export const CollectionsCreateRequest: core.serialization.Schema<
    serializers.CollectionsCreateRequest.Raw,
    Webflow.CollectionsCreateRequest
> = core.serialization.object({
    displayName: core.serialization.string(),
    singularName: core.serialization.string(),
    slug: core.serialization.string().optional(),
});

export declare namespace CollectionsCreateRequest {
    interface Raw {
        displayName: string;
        singularName: string;
        slug?: string | null;
    }
}
