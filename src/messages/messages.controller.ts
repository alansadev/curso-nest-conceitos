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
  @HttpCode(201)
  @Get()
  findAll(@Query() pagination: pagination) {
    const { limit = 10, offset = 0 } = pagination;
    return `This route return all messages. Limit=${limit}, Offset=${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This route return message ID: ${id}`;
  }

  @Post()
  create(@Body() body: messageBody) {
    return body;
  }

  @Put(':id')
  updateRoute(@Param() id: string, @Body() body: messageBody) {
    return { id, ...body };
  }

  @Patch(':id')
  patchRoute(@Param() id: string, @Body() body: messageBody) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  deleteRoute(@Param('id') id: string) {
    return `deleted - ${id}`;
  }
}
