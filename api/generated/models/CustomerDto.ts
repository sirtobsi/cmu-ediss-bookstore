/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewCustomerDto } from './NewCustomerDto';

export type CustomerDto = (NewCustomerDto & {
    id: number;
});

