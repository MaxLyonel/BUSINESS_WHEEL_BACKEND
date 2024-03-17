import { Person } from "src/persons/entities/person.entity";
import { Role } from "src/user_management/roles/entities/role.entity";
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";


@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   password: string

   @Column({default: false, nullable: true})
   active: boolean

   @Column({nullable: true})
   token: string

   @OneToOne(() => Person, (person) => person.id)
   @JoinColumn()
   person: number

   @ManyToMany(() => Role)
   @JoinTable()
   role: Role[]

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date

   @DeleteDateColumn()
   deletedAt: Date
}
