/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Webflow from "../../../../api/index";
import * as core from "../../../../core";

export const OrdersListRequestStatus: core.serialization.Schema<
    serializers.OrdersListRequestStatus.Raw,
    Webflow.OrdersListRequestStatus
> = core.serialization.enum_(["pending", "refunded", "dispute-lost", "fulfilled", "disputed", "unfulfilled"]);

export declare namespace OrdersListRequestStatus {
    type Raw = "pending" | "refunded" | "dispute-lost" | "fulfilled" | "disputed" | "unfulfilled";
}
