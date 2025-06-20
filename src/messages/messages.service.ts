import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: 1,
      text: 'Este é um recado de teste',
      sender: 'Joana',
      receiver: 'João',
      read: false,
      date: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Message not found!');
  }

  async findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    if (message) return message;
    this.throwNotFoundError();
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    return this.messageRepository.save(message);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const existMessageIndex = this.messages.findIndex(item => item.id === id);

    if (existMessageIndex < 0) this.throwNotFoundError();

    const messageExist = this.messages[existMessageIndex];

    this.messages[existMessageIndex] = {
      ...messageExist,
      ...updateMessageDto,
    };

    return this.messages[existMessageIndex];
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) return this.throwNotFoundError();

    return this.messageRepository.remove(message);
  }
}
