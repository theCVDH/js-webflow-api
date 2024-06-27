/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Webflow from "../../../../../api/index";
import * as core from "../../../../../core";

export const UsersInviteRequest: core.serialization.Schema<
    serializers.UsersInviteRequest.Raw,
    Webflow.UsersInviteRequest
> = core.serialization.object({
    email: core.serialization.string(),
    accessGroups: core.serialization.list(core.serialization.string()).optional(),
});

export declare namespace UsersInviteRequest {
    interface Raw {
        email: string;
        accessGroups?: string[] | null;
    }
}
