import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('seed')
    async seedUsers() {
        await this.userService.seedUser()
        return { message: 'Users seeded'}
    }

    @Post('fix-problems')
    async fixProblems() {
        const fixedCount = await this.userService.updateProblemsFlag();
        return { fixedCount }
    }
}
