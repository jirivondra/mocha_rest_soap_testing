import { HttpStatusCode } from 'axios';

export enum HTTP_STATUS {
    OK = HttpStatusCode.Ok,
    CREATED = HttpStatusCode.Created,
    NO_CONTENT = HttpStatusCode.NoContent,
    UNAUTHORIZED = HttpStatusCode.Unauthorized,
    NOT_FOUND = HttpStatusCode.NotFound,
    UNPROCESSABLE_ENTITY = HttpStatusCode.UnprocessableEntity,
    INTERNAL_SERVER_ERROR = HttpStatusCode.InternalServerError,
}
