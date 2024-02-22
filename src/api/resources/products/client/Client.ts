/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Webflow from "../../..";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization";
import * as errors from "../../../../errors";

export declare namespace Products {
    interface Options {
        environment?: core.Supplier<environments.WebflowEnvironment | string>;
        accessToken: core.Supplier<core.BearerToken>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Products {
    constructor(protected readonly _options: Products.Options) {}

    /**
     * Retrieve all products for a site. Use `limit` and `offset` to page through all products with subsequent requests. All SKUs for each product will also be fetched and returned. The `limit`, `offset` and `total` values represent Products only and do not include any SKUs.
     *
     * Required scope | `ecommerce:read`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.list("string", {})
     */
    public async list(
        siteId: string,
        request: Webflow.ProductsListRequest = {},
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.ProductAndSkUsList> {
        const { offset, limit } = request;
        const _queryParams: Record<string, string | string[]> = {};
        if (offset != null) {
            _queryParams["offset"] = offset.toString();
        }

        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ProductAndSkUsList.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Adding a new Product involves creating both a Product Item and a SKU Item, since a Product Item has to have, at minimum, a SKU Item.
     *
     * To create a new Product with multiple SKUs, you must:
     *
     * - Create the Product and Default SKU using this endpoint, making sure to add `sku-properties` in the product data.
     * - You can't add `sku-values` to the SKU yet, since there are no enum IDs created yet. When this endpoint returns, it will have IDs filled in for the `sku-properties` enums.
     * - With those IDs, update the default SKU with valid `sku-values` and create any additional SKUs (if needed), with valid `sku-values`.
     * - You can also create the Product without `sku-properties` and add them in later.
     * - If you add any `sku` properties, the default SKU will default to the first value of each option.
     *
     * Upon creation, the default product type will be `Advanced`. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.
     *
     * Required scope | `ecommerce:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.create("string", {
     *         publishStatus: Webflow.PublishStatus.Staging,
     *         product: {
     *             id: "580e63fc8c9a982ac9b8b745",
     *             lastPublished: new Date("2023-03-17T18:47:35.560Z"),
     *             lastUpdated: new Date("2023-03-17T18:47:35.560Z"),
     *             createdOn: new Date("2023-03-17T18:47:35.560Z"),
     *             isArchived: false,
     *             isDraft: false,
     *             fieldData: {
     *                 name: "My new item",
     *                 slug: "my-new-item",
     *                 skuProperties: [{
     *                         id: "ff42fee0113744f693a764e3431a9cc2",
     *                         name: "Color",
     *                         enum: [{
     *                                 id: "64a74715c456e36762fc39a1",
     *                                 name: "Royal Blue",
     *                                 slug: "royal-blue"
     *                             }]
     *                     }]
     *             }
     *         },
     *         sku: {
     *             id: "580e63fc8c9a982ac9b8b745",
     *             lastPublished: new Date("2023-03-17T18:47:35.560Z"),
     *             lastUpdated: new Date("2023-03-17T18:47:35.560Z"),
     *             createdOn: new Date("2023-03-17T18:47:35.560Z"),
     *             fieldData: {
     *                 name: "My new item",
     *                 slug: "my-new-item",
     *                 price: {
     *                     value: 100,
     *                     unit: "USD"
     *                 }
     *             }
     *         }
     *     })
     */
    public async create(
        siteId: string,
        request: Webflow.ProductsCreateRequest,
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.ProductAndSkUs> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            body: await serializers.ProductsCreateRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ProductAndSkUs.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Retrieve a single product by its id. All of its SKUs will also be retrieved.
     *
     * Required scope | `ecommerce:read`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.get("string", "string")
     */
    public async get(
        siteId: string,
        productId: string,
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.ProductAndSkUs> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products/${productId}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ProductAndSkUs.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updating an existing Product will set the product type to `Advanced`. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.
     *
     * Required scope | `ecommerce:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.update("string", "string", {
     *         publishStatus: Webflow.PublishStatus.Staging,
     *         product: {
     *             id: "580e63fc8c9a982ac9b8b745",
     *             lastPublished: new Date("2023-03-17T18:47:35.560Z"),
     *             lastUpdated: new Date("2023-03-17T18:47:35.560Z"),
     *             createdOn: new Date("2023-03-17T18:47:35.560Z"),
     *             isArchived: false,
     *             isDraft: false,
     *             fieldData: {
     *                 name: "My new item",
     *                 slug: "my-new-item",
     *                 skuProperties: [{
     *                         id: "ff42fee0113744f693a764e3431a9cc2",
     *                         name: "Color",
     *                         enum: [{
     *                                 id: "64a74715c456e36762fc39a1",
     *                                 name: "Royal Blue",
     *                                 slug: "royal-blue"
     *                             }]
     *                     }]
     *             }
     *         }
     *     })
     */
    public async update(
        siteId: string,
        productId: string,
        request: Webflow.ProductsUpdateRequest,
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.Product> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products/${productId}`
            ),
            method: "PATCH",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            body: await serializers.ProductsUpdateRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.Product.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Create additional SKUs to cover every variant of your Product. The Default SKU already counts as one of the variants.
     *
     * Creating additional SKUs will set the product type to `Advanced` for the product associated with the SKUs. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.
     *
     * Required scope | `ecommerce:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.createSku("string", "string", {
     *         publishStatus: Webflow.PublishStatus.Staging,
     *         skus: [{
     *                 id: "580e63fc8c9a982ac9b8b745",
     *                 lastPublished: new Date("2023-03-17T18:47:35.560Z"),
     *                 lastUpdated: new Date("2023-03-17T18:47:35.560Z"),
     *                 createdOn: new Date("2023-03-17T18:47:35.560Z"),
     *                 fieldData: {
     *                     name: "My new item",
     *                     slug: "my-new-item",
     *                     price: {
     *                         value: 100,
     *                         unit: "USD"
     *                     }
     *                 }
     *             }]
     *     })
     */
    public async createSku(
        siteId: string,
        productId: string,
        request: Webflow.ProductsCreateSkuRequest,
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.ProductsCreateSkuResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products/${productId}/skus`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            body: await serializers.ProductsCreateSkuRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ProductsCreateSkuResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updating an existing SKU will set the product type to `Advanced` for the product associated with the SKU. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.
     *
     * Required scope | `ecommerce:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.ForbiddenError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.ConflictError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.products.updateSku("string", "string", "string", {
     *         publishStatus: Webflow.PublishStatus.Staging,
     *         sku: {
     *             id: "580e63fc8c9a982ac9b8b745",
     *             lastPublished: new Date("2023-03-17T18:47:35.560Z"),
     *             lastUpdated: new Date("2023-03-17T18:47:35.560Z"),
     *             createdOn: new Date("2023-03-17T18:47:35.560Z"),
     *             fieldData: {
     *                 name: "My new item",
     *                 slug: "my-new-item",
     *                 price: {
     *                     value: 100,
     *                     unit: "USD"
     *                 }
     *             }
     *         }
     *     })
     */
    public async updateSku(
        siteId: string,
        productId: string,
        skuId: string,
        request: Webflow.ProductsUpdateSkuRequest,
        requestOptions?: Products.RequestOptions
    ): Promise<Webflow.Sku> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `v2/sites/${siteId}/products/${productId}/skus/${skuId}`
            ),
            method: "PATCH",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "2.0.0-beta",
            },
            contentType: "application/json",
            body: await serializers.ProductsUpdateSkuRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.Sku.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Webflow.BadRequestError(_response.error.body);
                case 401:
                    throw new Webflow.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Webflow.ForbiddenError(_response.error.body);
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
                case 409:
                    throw new Webflow.ConflictError(_response.error.body);
                case 429:
                    throw new Webflow.TooManyRequestsError(_response.error.body);
                case 500:
                    throw new Webflow.InternalServerError(_response.error.body);
                default:
                    throw new errors.WebflowError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.WebflowError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.WebflowTimeoutError();
            case "unknown":
                throw new errors.WebflowError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader() {
        return `Bearer ${await core.Supplier.get(this._options.accessToken)}`;
    }
}
