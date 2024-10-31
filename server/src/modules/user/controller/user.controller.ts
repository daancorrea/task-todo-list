import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/login';
import { RegisterDto } from '../dto/register';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  @ApiBody({ type: LoginDto, description: 'User login data' })
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const token = await this.userService.login(email, password);
    return { token };
  }

  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - invalid data' })
  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  async register(@Body() body: RegisterDto) {
    const { email, password } = body;
    await this.userService.register(email, password);
    return { message: 'User registered successfully' };
  }
}
