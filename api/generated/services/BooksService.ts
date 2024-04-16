/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookDto } from '../models/BookDto';
import type { RelatedBookDto } from '../models/RelatedBookDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BooksService {

    /**
     * Add a new book
     * Add a new book to the database
     * @param requestBody
     * @returns BookDto Created
     * @throws ApiError
     */
    public static postBooks(
        requestBody: BookDto,
    ): CancelablePromise<BookDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/books',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Illegal, missing, or malformed input`,
                422: `ISBN already exists`,
            },
        });
    }

    /**
     * Get a book by id
     * Get a book by id
     * @param isbn ISBN of the book to get
     * @returns BookDto OK
     * @throws ApiError
     */
    public static getBooks(
        isbn: string,
    ): CancelablePromise<BookDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/{ISBN}',
            path: {
                'ISBN': isbn,
            },
            errors: {
                404: `ISBN not found`,
            },
        });
    }

    /**
     * Update a book by id
     * Update a book by id
     * @param isbn ISBN of the book to update
     * @param requestBody
     * @returns BookDto OK
     * @throws ApiError
     */
    public static putBooks(
        isbn: string,
        requestBody: BookDto,
    ): CancelablePromise<BookDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/books/{ISBN}',
            path: {
                'ISBN': isbn,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Illegal, missing, or malformed input`,
                404: `ISBN not found`,
            },
        });
    }

    /**
     * Get related books by ISBN
     * Get related books by ISBN
     * @param isbn ISBN of the book to get related books
     * @returns RelatedBookDto OK
     * @throws ApiError
     */
    public static getBooksRelatedBooks(
        isbn: string,
    ): CancelablePromise<Array<RelatedBookDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/books/{ISBN}/related-books',
            path: {
                'ISBN': isbn,
            },
            errors: {
                503: `Service unavailable`,
                504: `Gateway timeout`,
            },
        });
    }

}
