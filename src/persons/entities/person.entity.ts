import { User } from "src/user_management/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Person {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   firstName: string

   @Column()
   secondName: string

   @Column()
   lastName: string

   @Column()
   mothersLastName: string

   @Column()
   birthDate: Date

   @Column()
   direction: string

   @Column()
   identityCard: string

   @Column()
   gender: string

   @OneToOne(() => User, (user) => user.id)
   user: number

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   udpatedAt: Date

   @DeleteDateColumn()
   deletedAt: Date
}
