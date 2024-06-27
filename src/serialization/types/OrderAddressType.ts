/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Webflow from "../../api/index";
import * as core from "../../core";

export const OrderAddressType: core.serialization.Schema<serializers.OrderAddressType.Raw, Webflow.OrderAddressType> =
    core.serialization.enum_(["shipping", "billing"]);

export declare namespace OrderAddressType {
    type Raw = "shipping" | "billing";
}
