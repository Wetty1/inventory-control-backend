import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from '../../../../user/domain/user';

@Entity('users')
export class UserTypeorm {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }

    static from(user: User) {
        const userTypeorm = new UserTypeorm();
        userTypeorm.id = user.id;
        userTypeorm.name = user.name;
        userTypeorm.email = user.email;
        userTypeorm.password = user.password;
        return userTypeorm;
    }
}
