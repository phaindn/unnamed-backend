import { Timestamp } from "../@types/number";

export interface IModel {
    created_at?: Timestamp|null;
    updated_at?: Timestamp|null;
    deleted_at?: Timestamp|null;
}