import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRespository: Repository<Person>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found!');
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        email: createPersonDto.email,
        passwordHash: createPersonDto.password,
      };

      const newPerson = this.personRespository.create(personData);
      const person = await this.personRespository.save(newPerson);
      return person;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('Email já está cadastrado');
      }
      throw error;
    }
  }

  async findAll() {
    const people = this.personRespository.find({
      order: {
        id: 'desc',
      },
    });

    return people;
  }

  async findOne(id: number) {
    const person = await this.personRespository.findOneBy({ id });

    if (!person) return this.throwNotFoundError();
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const updateData = {
      name: updatePersonDto.name,
      passwordHash: updatePersonDto.password,
    };
    const person = await this.personRespository.preload({ id, ...updateData });

    if (!person) return this.throwNotFoundError();

    return this.personRespository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRespository.findOneBy({ id });
    if (!person) return this.throwNotFoundError();

    return this.personRespository.remove(person);
  }
}
