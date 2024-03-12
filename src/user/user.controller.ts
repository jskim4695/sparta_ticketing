import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './dto/signUp.dto'
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async register(@Body() signUpDto: SignUpDto) {
    return await this.userService.register(signUpDto.email, signUpDto.password, signUpDto.name, signUpDto.phone, signUpDto.nickName);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@UserInfo() user: User) {
    const userProfile = await this.userService.getUserProfile(user.id)
    const point = userProfile.pointTransaction[userProfile.pointTransaction.length - 1];
    
    return {
      ...user,
      points: point.balance
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateUserProfile(
    @Param('id') id: number,
    @UserInfo() user: User,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.userService.updateUserProfile(id, updateProfileDto)
  }
}