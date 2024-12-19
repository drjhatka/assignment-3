import { Request, Response,NextFunction } from "express"
import { AnyZodObject } from "zod"

export const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const zodParsedData = await schema.parseAsync(req.body)
            next()
        } catch (err) {
            next(err)
        }
    }

}