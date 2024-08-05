import { PartialType } from '@nestjs/mapped-types';
import { CreateFindexDto } from './create-findex.dto';

export class UpdateFindexDto extends PartialType(CreateFindexDto) {}
