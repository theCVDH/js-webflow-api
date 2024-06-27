/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Webflow from "../../api/index";
import * as core from "../../core";
import { Product } from "./Product";
import { Sku } from "./Sku";

export const ProductAndSkUs: core.serialization.ObjectSchema<serializers.ProductAndSkUs.Raw, Webflow.ProductAndSkUs> =
    core.serialization.object({
        product: Product.optional(),
        skus: core.serialization.list(Sku).optional(),
    });

export declare namespace ProductAndSkUs {
    interface Raw {
        product?: Product.Raw | null;
        skus?: Sku.Raw[] | null;
    }
}
