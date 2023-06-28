import { Column, PrimaryColumn } from "typeorm";

export class DefaultEntity {
  @PrimaryColumn()
  id: number;
}
