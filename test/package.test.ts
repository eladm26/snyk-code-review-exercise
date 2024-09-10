import * as dotenv from 'dotenv';
dotenv.config();

import { createApp } from '../src/app';
import { Server } from 'http';
import request from 'supertest';
import e from 'express';
import got from 'got';
import { NPMPackage } from '../src/utils/types';
import { mockedNPMPackages } from './mock-data/packages-data';

jest.mock('got');

const mockedResponse = {
  dependencies: {
    'loose-envify': {
      version: '1.4.0',
      dependencies: {
        'js-tokens': {
          version: '4.0.0',
          dependencies: {},
        },
      },
    },
    'object-assign': {
      version: '4.1.1',
      dependencies: {},
    },
    'prop-types': {
      version: '15.8.1',
      dependencies: {
        'object-assign': {
          version: '4.1.1',
          dependencies: {},
        },
        'loose-envify': {
          version: '1.4.0',
          dependencies: {
            'js-tokens': {
              version: '4.0.0',
              dependencies: {},
            },
          },
        },
        'react-is': {
          version: '16.13.1',
          dependencies: {},
        },
      },
    },
  },
};

describe('/packages/:name/:version endpoint', () => {
  let server: Server;
  let port: number;
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
    expect(response.body.dependencies).toEqual(mockedResponse.dependencies),
      expect(response.body.name).toEqual(packageName);
    expect(response.body.version).toEqual(packageVersion);
  });
});
