import * as dotenv from 'dotenv';
dotenv.config();

import { createApp } from '../src/app';
import { Server } from 'http';
import request from 'supertest';
import e from 'express';
import got from 'got';
import { NPMPackage } from '../src/utils/types';
import {
  mockedNPMPackages,
  reactMockedResponse,
} from './mock-data/packages-data';
import { StatusCodes } from 'http-status-codes';

jest.mock('got');

describe('/packages/:name/:version endpoint', () => {
  let app: e.Express;

  beforeAll(async () => {
    app = createApp();
  });

  it('should reponse with the correct fields', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    (got as Function as jest.Mock<any, any>).mockReturnValue({
      json: jest.fn(() => {
        const url = (got as Function as jest.Mock<any, any>).mock.lastCall[0];
        const name = url.split('/').at(-1);
        return mockedNPMPackages[name];
      }),
      statusCode: 200,
      status: 200,
    });

    const response = await request(app).get(
      `/api/v1/packages/${packageName}/${packageVersion}`,
    );

    expect(got).toBeCalledWith(`https://registry.npmjs.org/${packageName}`);

    expect(response.status).toEqual(200);

    // expect(response.headers['content-Type']).toMatch(/json/)
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.dependencies).toEqual(
      reactMockedResponse.dependencies,
    ),
      expect(response.body.name).toEqual(packageName);
    expect(response.body.version).toEqual(packageVersion);
  });

  it('should fail on version validator', async () => {
    const response = await request(app).get(`/api/v1/packages/react/2.`);
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.msg).toEqual('invalid package semver version');
  });

  it('should return not found', async () => {
    const response = await request(app).get(`/api/v1/nowhere/react/16.13.10`);
    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
  });
});
