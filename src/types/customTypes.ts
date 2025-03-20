import { Request } from 'express';
import { UserInterface } from './schema_types/schemaTypes';

export interface AuthRequest extends Request {
  user?: UserInterface;  
}
