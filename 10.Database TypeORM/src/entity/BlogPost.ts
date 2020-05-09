import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BlogPost { 
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
  
  @Column()
  content: string
  
  @Column()
  isPublished: boolean
}