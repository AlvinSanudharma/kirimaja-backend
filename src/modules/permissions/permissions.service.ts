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

    async getUserPermissions(userId: number): Promise<string[]> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return [];
        }

        return (
            user.role.rolePermissions.map((rolePermission) => {
                return rolePermission.permission.key;
            }) || []
        );
    }

    async userHasAnyPermission(
        userId: number,
        permissions: string[],
    ): Promise<boolean> {
        const userPermissions = await this.getUserPermissions(userId);

        return permissions.some((permission) =>
            userPermissions.includes(permission),
        );
    }

    async userHasAllPermissions(
        userId: number,
        permissions: string[],
    ): Promise<boolean> {
        const userPermissions = await this.getUserPermissions(userId);

        return permissions.every((permission) =>
            userPermissions.includes(permission),
        );
    }
}
