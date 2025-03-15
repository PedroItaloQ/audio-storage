import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { Audio } from './entity/audio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audio])],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
