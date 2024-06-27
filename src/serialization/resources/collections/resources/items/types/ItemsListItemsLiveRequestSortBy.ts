/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Webflow from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const ItemsListItemsLiveRequestSortBy: core.serialization.Schema<
    serializers.collections.ItemsListItemsLiveRequestSortBy.Raw,
    Webflow.collections.ItemsListItemsLiveRequestSortBy
> = core.serialization.enum_(["lastPublished", "name", "slug"]);

export declare namespace ItemsListItemsLiveRequestSortBy {
    type Raw = "lastPublished" | "name" | "slug";
}
