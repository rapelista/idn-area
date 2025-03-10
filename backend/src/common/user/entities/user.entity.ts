import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../entity/base.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Role } from '../enum/role.enum';

@Entity('users')
@Index(['id', 'username', 'email'], {
  unique: true,
  where: '"deletedAt" IS NULL AND "deletedBy" IS NULL',
})
export class User extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  username: string;

  @IsEmail()
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false, enum: Role, default: Role.STAFF })
  role: Role;

  @Column({ nullable: true })
  image?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && this.password.length < 60) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
