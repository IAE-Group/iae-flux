import { ApiProperty } from '@nestjs/swagger';

export class FileIdentifier {
  @ApiProperty({ type: 'string' })
  fileID: string;
}
