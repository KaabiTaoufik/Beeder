import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAnimalOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, animal } = context.switchToHttp().getRequest();
    return user.id === animal.ownerId;
  }
}
