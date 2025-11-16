import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<Permission[]> {
        return await this.prismaService.permission.findMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }
}
