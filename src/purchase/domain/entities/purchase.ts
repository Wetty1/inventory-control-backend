export interface Purchase {
    id?: number;
    date: Date;
    value: number;
    event_id: number;
    quantity: number;
    unit_value: number;
    total_value: number;
    created_at?: Date;
    updated_at?: Date;
}
