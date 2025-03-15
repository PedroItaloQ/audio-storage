import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AudioService } from './audio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get()
  async listAudios() {
    return this.audioService.listAudios();
  }

  @Get(':id')
  async getAudio(@Param('id') id: string, @Res() res: Response) {
    const audio = await this.audioService.getAudio(id);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audio.data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('Nenhum arquivo enviado!');
    return this.audioService.uploadAudio(file.originalname, file.buffer);
  }

  @Delete(':id')
  async deleteAudio(@Param('id') id: string) {
    return this.audioService.deleteAudio(id);
  }
}
