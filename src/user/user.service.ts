import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { PointTransaction } from 'src/point/entities/point.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PointTransaction)
    private pointTransactionRepository: Repository<PointTransaction>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name:string, phone:string, nickName:string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      phone,
      nickName
    });

    const pointTransaction = this.pointTransactionRepository.create({
      balance: 1000000, // 초기 포인트 100만
      pointHistory: 1000000, // 변동된 포인트도 100만
      changeDate: new Date(), // 현재 날짜/시간
      changeReason: '회원가입 보너스', // 변동 사유
      user: newUser, // 포인트 변동을 받는 사용자 지정
    })

    await this.pointTransactionRepository.save(pointTransaction)

    return newUser
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserProfile(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['pointTransaction'],
    });
  }

  async updateUserProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.findById(id)
    if(!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.')
    }
    
    if (updateProfileDto.password) {
      user.password = updateProfileDto.password;
    }
    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }
    if (updateProfileDto.is_admin !== undefined) {
      user.is_admin = updateProfileDto.is_admin;
    }
    if (updateProfileDto.nickName) {
      user.nickName = updateProfileDto.nickName;
    }
    if (updateProfileDto.phone) {
      user.phone = updateProfileDto.phone;
    }

    await this.userRepository.save(user)

    return user
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}