import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

async function bootstrap () {
  const port = process.env.PORT || 3001
  const host = process.env.HOST || '0.0.0.0'
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  )
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  try {
    await app.listen(port, host, () => {
      console.log('Server running on ' + port)
    })
  } catch (e) {
    console.error(e.message + ' status: ' + e.status)
    process.exit(1)
  }
}

bootstrap()
