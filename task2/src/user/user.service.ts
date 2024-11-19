import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ){}

    async seedUser() {
        for (let i = 0; i < 1000000; i++) {
            const gender = faker.person.sexType()
            const firstName = faker.person.firstName(gender)
            const user = this.userRepository.create({
                firstName: firstName,
                lastName: faker.person.lastName(),
                age: faker.number.int({min: 16, max: 95}),
                gender: gender,
                hasProblems: faker.datatype.boolean()
            });
            await this.userRepository.save(user)
        }
    }

    async updateProblemsFlag(): Promise<Number> {
        const usersWithProblems = await this.userRepository.count({
            where: { hasProblems: true }
        });
        
        await this.userRepository.update({ hasProblems: true }, { hasProblems: false});
        return usersWithProblems;
    }
}
