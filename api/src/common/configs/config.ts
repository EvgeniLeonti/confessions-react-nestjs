import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: Number(process.env.PORT) || 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'docs',
  },

  security: {
    expiresIn: '60m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
