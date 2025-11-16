import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<Permission[]> {
        return await this.prismaService.permission.findMany();
    }

    async findOne(id: number): Promise<Permission> {
        const permission = await this.prismaService.permission.findUnique({
            where: {
                id,
            },
        });

        if (!permission) {
            throw new NotFoundException(`Permission with ID ${id} not found`);
        }

        return {
            id: permission.id,
            name: permission.name,
            key: permission.key,
            resource: permission.resource,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        };
    }
}
