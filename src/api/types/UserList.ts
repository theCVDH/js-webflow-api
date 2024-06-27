/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Webflow from "../index";

/**
 * The list users results
 */
export interface UserList {
    /** Number of users returned */
    count?: number;
    /** The limit specified in the request */
    limit?: number;
    /** The offset specified for pagination */
    offset?: number;
    /** Total number of users in the collection */
    total?: number;
    /** List of Users for a Site */
    users?: Webflow.User[];
}
