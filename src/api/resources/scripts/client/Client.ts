/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Webflow from "../../..";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization";
import * as errors from "../../../../errors";

export declare namespace Scripts {
    interface Options {
        environment?: core.Supplier<environments.WebflowEnvironment | string>;
        accessToken: core.Supplier<core.BearerToken>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Scripts {
    constructor(protected readonly _options: Scripts.Options) {}

    /**
     * List of scripts registered to a Site. </br></br> In order to use the Custom Code APIs for Sites and Pages, Custom Code Scripts must first be registered to a Site via the `registered_scripts` endpoints, and then applied to a Site or Page using the appropriate `custom_code` endpoints. Additionally, Scripts can be remotely hosted, or registered as inline snippets. </br></br> Required scope | `custom_code:read`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     *
     * @example
     *     await webflow.scripts.list("site-id")
     */
    public async list(siteId: string, requestOptions?: Scripts.RequestOptions): Promise<Webflow.RegisteredScriptList> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${siteId}/registered_scripts`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "0.0.4",
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.RegisteredScriptList.parseOrThrow(_response.body, {
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
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
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
     * Add a script to a Site's Custom Code registry. </br></br> In order to use the Custom Code APIs for Sites and Pages, Custom Code Scripts must first be registered to a Site via the `registered_scripts` endpoints, and then applied to a Site or Page using the appropriate `custom_code` endpoints. Additionally, Scripts can be remotely hosted, or registered as inline snippets. </br></br> Required scope | `custom_code:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     */
    public async registerHosted(
        siteId: string,
        request: Webflow.CustomCodeHostedRequest,
        requestOptions?: Scripts.RequestOptions
    ): Promise<Webflow.CustomCodeResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${siteId}/registered_scripts/hosted`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "0.0.4",
            },
            contentType: "application/json",
            body: await serializers.CustomCodeHostedRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.CustomCodeResponse.parseOrThrow(_response.body, {
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
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
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
     * Add a script to a Site's Custom Code registry. Inline scripts can be between 1 and 2000 characters. </br></br> In order to use the Custom Code APIs for Sites and Pages, Custom Code Scripts must first be registered to a Site via the `registered_scripts` endpoints, and then applied to a Site or Page using the appropriate `custom_code` endpoints. </br></br> Required scope | `custom_code:write`
     * @throws {@link Webflow.BadRequestError}
     * @throws {@link Webflow.UnauthorizedError}
     * @throws {@link Webflow.NotFoundError}
     * @throws {@link Webflow.TooManyRequestsError}
     * @throws {@link Webflow.InternalServerError}
     */
    public async registerInline(
        siteId: string,
        request: Webflow.CustomCodeInlineRequest,
        requestOptions?: Scripts.RequestOptions
    ): Promise<Webflow.CustomCodeResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.WebflowEnvironment.Default,
                `sites/${siteId}/registered_scripts/inline`
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "webflow-api",
                "X-Fern-SDK-Version": "0.0.4",
            },
            contentType: "application/json",
            body: await serializers.CustomCodeInlineRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.CustomCodeResponse.parseOrThrow(_response.body, {
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
                case 404:
                    throw new Webflow.NotFoundError(_response.error.body);
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
