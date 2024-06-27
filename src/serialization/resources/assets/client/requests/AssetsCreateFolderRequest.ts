/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Webflow from "../../../../../api/index";
import * as core from "../../../../../core";

export const AssetsCreateFolderRequest: core.serialization.Schema<
    serializers.AssetsCreateFolderRequest.Raw,
    Webflow.AssetsCreateFolderRequest
> = core.serialization.object({
    displayName: core.serialization.string(),
    parentFolder: core.serialization.string().optional(),
});

export declare namespace AssetsCreateFolderRequest {
    interface Raw {
        displayName: string;
        parentFolder?: string | null;
    }
}
