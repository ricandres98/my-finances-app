import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/types/user.types';
import { NextResponse } from 'next/server';

const service = new UserService();

export async function POST(request: Request) {
	const body = await request.json()
	const { email, password, username }: CreateUserDto = body;
	const [error] = await service.create({ email, password, username });

	if (error) {
		return new Response(error.message, { status: 400 })
	}

	NextResponse.json({ message: "Creado con éxito" }, { status: 201 });
}