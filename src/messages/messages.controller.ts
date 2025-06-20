import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(201)
  @Get()
  findAll() {
    return 'This route return all messages';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This route return message ID: ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
