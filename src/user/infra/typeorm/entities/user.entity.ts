import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from '../../../../user/domain/user';

@Entity('users')
export class UserTypeorm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    status: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }

    static from(user: User): UserTypeorm {
        const userTypeorm = new UserTypeorm();
        userTypeorm.id = user.getId();
        userTypeorm.name = user.getName();
        userTypeorm.email = user.getEmail();
        userTypeorm.password = user.getPassword();
        userTypeorm.role = user.getRole();
        userTypeorm.status = user.getStatus();
        return userTypeorm;
    }

    static to(userTypeorm: UserTypeorm): User {
        const user = User.restore(
            userTypeorm.id,
            userTypeorm.name,
            userTypeorm.password,
            userTypeorm.email,
            userTypeorm.role,
            userTypeorm.status,
        );
        return user;
    }
}
