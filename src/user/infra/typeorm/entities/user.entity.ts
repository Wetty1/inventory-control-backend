import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from '../../../../user/domain/entities/user';

@Entity('users')
export class UserTypeorm implements User {
    @PrimaryGeneratedColumn()
    id: number;

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
}
