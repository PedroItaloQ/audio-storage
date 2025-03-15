import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio } from './entity/audio.entity';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
  ) {}

  async uploadAudio(filename: string, buffer: Buffer): Promise<Audio> {
    const audio = this.audioRepository.create({ filename, data: buffer });
    return await this.audioRepository.save(audio);
  }

  async getAudio(id: string): Promise<Audio> {
    const audio = await this.audioRepository.findOne({ where: { id } });
    if (!audio) {
      throw new NotFoundException('Áudio não encontrado');
    }
    return audio;
  }

  async deleteAudio(id: string): Promise<void> {
    const result = await this.audioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Áudio não encontrado');
    }
  }

  async listAudios(): Promise<Audio[]> {
    return this.audioRepository.find();
  }
}
