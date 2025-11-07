import 'reflect-metadata';
import { Container } from 'inversify';
import { CafeService } from './services/cafeService';
import { EmployeeService } from './services/employeeService';
import { CafeController } from './controllers/cafeController';
import { EmployeeController } from './controllers/employeeController';
import { prisma } from './utils/prismaClient';
import { TYPES } from './types';

const container = new Container();

container.bind(TYPES.PrismaClient).toConstantValue(prisma);

container.bind(TYPES.ICafeService).to(CafeService).inSingletonScope();
container.bind(TYPES.IEmployeeService).to(EmployeeService).inSingletonScope();

container.bind(CafeController).toSelf().inSingletonScope();
container.bind(EmployeeController).toSelf().inSingletonScope();

export { container };