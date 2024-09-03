import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: User;
}
