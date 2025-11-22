import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/logged-in.guard';
import { PermissionGuard } from './modules/auth/guards/permission.guard';
import { RequirePermissions } from './modules/auth/decorators/permissions.decorator';

@Controller()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('protected')
    @RequirePermissions('shipments.create')
    getProtectedResource(): string {
        return 'This is a protected resource';
    }
}
