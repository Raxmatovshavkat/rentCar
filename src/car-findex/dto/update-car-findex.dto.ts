import { PartialType } from '@nestjs/mapped-types';
import { CreateCarFindexDto } from './create-car-findex.dto';

export class UpdateCarFindexDto extends PartialType(CreateCarFindexDto) {}
