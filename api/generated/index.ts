/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { BookDto } from './models/BookDto';
export type { BookMobileBFFDto } from './models/BookMobileBFFDto';
export type { CustomerDto } from './models/CustomerDto';
export type { CustomerWebBFFDto } from './models/CustomerWebBFFDto';
export type { HelloWorldResponseDto } from './models/HelloWorldResponseDto';
export type { NewCustomerDto } from './models/NewCustomerDto';
export type { RelatedBookDto } from './models/RelatedBookDto';

export { BooksService } from './services/BooksService';
export { CustomersService } from './services/CustomersService';
export { DefaultService } from './services/DefaultService';
