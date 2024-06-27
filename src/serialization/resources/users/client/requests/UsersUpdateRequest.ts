/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Webflow from "../../../../../api/index";
import * as core from "../../../../../core";
import { UsersUpdateRequestData } from "../../types/UsersUpdateRequestData";

export const UsersUpdateRequest: core.serialization.Schema<
    serializers.UsersUpdateRequest.Raw,
    Webflow.UsersUpdateRequest
> = core.serialization.object({
    data: UsersUpdateRequestData.optional(),
    accessGroups: core.serialization.list(core.serialization.string()).optional(),
});

export declare namespace UsersUpdateRequest {
    interface Raw {
        data?: UsersUpdateRequestData.Raw | null;
        accessGroups?: string[] | null;
    }
}
