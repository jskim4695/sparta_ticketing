import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user
    if(!user) return null;

    if(data) {
      return user[data]
    }
    return user
  },
);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const UserInfo = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user ? request.user : null;
//   },
// );