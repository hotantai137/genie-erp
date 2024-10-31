import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({type: String})
  phoneNumber: string;
  @ApiPropertyOptional({type: String})
  email: string;
  @ApiProperty({type: String})
  firstName: string;
  @ApiProperty({type: String})
  lastName: string;
  @ApiPropertyOptional({type: String})
  birthDate: string;
  @ApiPropertyOptional({type: String})
  avatar: string;
  @ApiPropertyOptional({type: String})
  address: string;
  @ApiProperty({type: Number})
  companyId: number;
}