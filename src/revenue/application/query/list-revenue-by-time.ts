import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevenueTypeorm } from 'src/revenue/infra/database/typeorm/entities/revenue.entity';

@Injectable()
export class ListRevenueByTime {
    constructor(
        @InjectRepository(RevenueTypeorm)
        private readonly revenueRepository: Repository<RevenueTypeorm>,
    ) {}

    async execute(startDate: Date, endDate: Date) {
        const sql = `SELECT * FROM revenue WHERE date >= '${startDate}' AND date <= '${endDate}'`;
        console.log(sql);
        return this.revenueRepository.query(sql);
    }
}
