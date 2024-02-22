/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Webflow from "../../api";
import * as core from "../../core";

export const OrderCustomerInfo: core.serialization.ObjectSchema<
    serializers.OrderCustomerInfo.Raw,
    Webflow.OrderCustomerInfo
> = core.serialization.object({
    fullName: core.serialization.string().optional(),
    email: core.serialization.string().optional(),
});

export declare namespace OrderCustomerInfo {
    interface Raw {
        fullName?: string | null;
        email?: string | null;
    }
}
