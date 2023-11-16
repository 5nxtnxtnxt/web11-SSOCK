import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { SnowballEntity } from './snowball.entity';

@Entity({ name: 'snowball_decoration' })
export class SnowballDecorationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: number;

  @Column()
  decoration_id: number;

  @Column()
  location: number;

  @ManyToOne(() => SnowballEntity, deco => deco.deco_snowballs)
  @JoinColumn({ name: 'snowball_id' })
  deco_snowballs: SnowballEntity;
}
