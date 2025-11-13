import { z, ZodObject } from 'zod';

const updateRoleSchema = z.object({
    permission_ids: z
        .array(
            z.number({
                required_error: 'Permission IDs are required',
                invalid_type_error:
                    'Permission IDs must be an array of numbers',
            }),
        )
        .nonempty({
            message: 'At least one permission ID must be provided',
        }),
});

export class UpdateRoleDto {
    static schema: ZodObject<any> = updateRoleSchema;

    constructor(public permission_ids: number[]) {}
}
