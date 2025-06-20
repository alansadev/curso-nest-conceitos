import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

type messageBody = {
  message: string;
  nova_chave: string;
};
type pagination = {
  offset: number;
  limit: number;
};

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() pagination: pagination) {
    const { limit = 10, offset = 0 } = pagination;

    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.messagesService.create(body);
  }

  @Put(':id')
  updateRoute(@Param('id') id: string, @Body() body: messageBody) {
    return this.messagesService.update(id, body);
  }

  @Patch(':id')
  patchRoute(@Param('id') id: string, @Body() body: messageBody) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  deleteRoute(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
