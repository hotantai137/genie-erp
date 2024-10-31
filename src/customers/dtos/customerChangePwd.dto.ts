import { ApiProperty } from '@nestjs/swagger';

export class CustomerChangePwdDto {
  @ApiProperty({type: String})
  phoneNumber: string;
  @ApiProperty({type: String})
  currentPassword: string;
  @ApiProperty({type: String})
  newPassword: string;
}