import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError, ApiErrorCodes } from '../errorhandler/APIError'

type DecodedToken = {
  sub: string | undefined
  roles: string | undefined
  iss: string | undefined
  exp: number | undefined
  usrn: string | undefined
  iat: number | undefined
}

/**
 * Validates the token in the request header.
 * @param req the incoming request.
 * @param res the outgoing response.
 * @param next the next (middleware) function.
 * @throws {ApiError} if the token is invalid.
 */
export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.decode(token) as DecodedToken
      if (decoded) {
        checkValidSUB(decoded.sub)
        checkValidISS(decoded.iss)
        checkTokenExpiration(decoded.exp)
        next()
        return
      }
    } catch (error) {
      throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
    }
  }
  throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
}

/**
 * Checks if the SUB is valid.
 * @param sub the sub field of the decoded token.
 * @throws {ApiError} if the token is invalid.
 */
const checkValidSUB = (sub: string | undefined): void => {
  const validSUB = ['starlord', 'gamora', 'drax', 'rocket', 'groot']
  if (!sub || !validSUB.includes(sub)) {
    throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
  }
}

/**
 * Checks if the ISS is valid.
 * @param iss the iss field of the decoded token.
 * @throws {ApiError} if the token is invalid.
 */
const checkValidISS = (iss: string | undefined): void => {
  const validISS = ['cmu.edu']
  if (!iss || !validISS.includes(iss)) {
    throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
  }
}

/**
 * Checks if the token has expired.
 * @param exp the exp field of the decoded token.
 * @throws {ApiError} if the token is expired.
 */
const checkTokenExpiration = (exp: number | undefined): void => {
  if (!exp || Date.now() >= exp * 1000) {
    throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Token expired')
  }
}
