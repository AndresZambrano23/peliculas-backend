import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from 'typeorm';
import { Credential } from 'src/credentials/entities/credential.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @OneToOne(() => Credential, (credential) => credential.userId)
  credentialId: Credential;
}
