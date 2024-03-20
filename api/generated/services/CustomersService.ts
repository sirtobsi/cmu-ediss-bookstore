/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from '../models/CustomerDto';
import type { NewCustomerDto } from '../models/NewCustomerDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomersService {

    /**
     * Add a new customer
     * Add a new customer to the database
     * @param requestBody
     * @returns CustomerDto Created
     * @throws ApiError
     */
    public static postCustomers(
        requestBody: NewCustomerDto,
    ): CancelablePromise<CustomerDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Illegal, missing, or malformed input`,
                422: `User ID already exists`,
            },
        });
    }

    /**
     * Get customer by userId
     * Get customer customers
     * @param userId userId of the customer to get
     * @returns CustomerDto OK
     * @throws ApiError
     */
    public static getCustomers(
        userId: string,
    ): CancelablePromise<CustomerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customers',
            query: {
                'userId': userId,
            },
            errors: {
                400: `Illegal, missing, or malformed input`,
                404: `User ID not found`,
            },
        });
    }

    /**
     * Get a customer by id
     * Get a customer by id
     * @param id ID of the customer to get
     * @returns CustomerDto OK
     * @throws ApiError
     */
    public static getCustomers1(
        id: number,
    ): CancelablePromise<CustomerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customers/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `ID not found`,
            },
        });
    }

}
