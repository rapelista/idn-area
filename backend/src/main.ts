import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedersService } from './database/seeders/seeders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // TODO: Disable when production
  const seedService = app.get(SeedersService);
  await seedService.seedBaseData();

  app.enableCors();

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('IDN-Area API V1.0')
    .setDescription(
      'IDN-Area API adalah layanan yang digunakan untuk mengelola data wilayah administratif di Indonesia. ' +
        'API ini menyediakan berbagai endpoint untuk mendapatkan, menambah, memperbarui, dan menghapus data wilayah, mulai dari provinsi, kabupaten/kota, kecamatan, desa/kelurahan, hingga pulau.\n\n' +
        '**Fitur Utama:**\n' +
        '- **Manajemen Provinsi**: Menyediakan informasi dan pengelolaan data provinsi di Indonesia.\n' +
        '- **Manajemen Kabupaten/Kota**: Mengelola daftar kabupaten/kota dalam setiap provinsi.\n' +
        '- **Manajemen Kecamatan**: Menyediakan informasi kecamatan berdasarkan kabupaten/kota.\n' +
        '- **Manajemen Desa/Kelurahan**: Mengelola data desa/kelurahan dalam kecamatan.\n' +
        '- **Manajemen Pulau**: Menyediakan informasi tentang pulau-pulau yang ada di Indonesia.\n\n' +
        '**Keamanan & Autentikasi:**\n' +
        '- API menggunakan autentikasi **Bearer Token** untuk memastikan hanya pengguna yang berwenang yang dapat mengakses data.\n' +
        '- Menggunakan standar keamanan untuk memastikan integritas dan validitas data wilayah.\n\n' +
        '**Penggunaan API:**\n' +
        'Endpoint API ini dapat digunakan oleh berbagai sistem yang memerlukan data wilayah, seperti platform pemerintahan, e-commerce, sistem logistik, dan aplikasi berbasis lokasi.',
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000/', 'API Local')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('iqro', app, document, {
    useGlobalPrefix: true,
    customSiteTitle: 'IDN Area API V1.0',
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3000);
}
bootstrap();
