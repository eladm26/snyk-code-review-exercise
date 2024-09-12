import { RequestHandler } from 'express';
import { maxSatisfying } from 'semver';
import got from 'got';
import { NPMPackage } from '../utils/types';
import memoize from 'memoizee';
import { asyncHandler } from '../middleware/errorHandlerMiddleware';

const MEMOIZE_MAX_AGE = 1000 * 60 * 5;
const MEMOIZE_CACHE_SIZE = 100;

type Package = { version: string; dependencies: Record<string, Package> };

/**
 * Attempts to retrieve package data from the npm registry and return it
 */

export const getPackage: RequestHandler = asyncHandler(async function (
  req,
  res,
  next
) {
  const { name, version } = req.params;
  const dependencyTree = {};
  const npmPackage: NPMPackage = await getNpmPackageMemoized(name);

  const dependencies: Record<string, string> =
    npmPackage.versions[version].dependencies ?? {};

  const promisesAtwork: Promise<Package>[] = [];

  await getDependenciesRecurse(dependencies, promisesAtwork, dependencyTree);

  return res.status(200).json({ name, version, dependencies: dependencyTree });
});

async function getDependencies(name: string, range: string): Promise<Package> {
  const npmPackage: NPMPackage = await getNpmPackageMemoized(name);

  const v = maxSatisfying(Object.keys(npmPackage.versions), range);

  const dependencies: Record<string, Package> = {};

  if (v) {
    const promisesAtwork: Promise<Package>[] = [];

    const newDeps = npmPackage.versions[v].dependencies;

    await getDependenciesRecurse(newDeps, promisesAtwork, dependencies);
  }

  return { version: v ?? range, dependencies };
}

async function getDependenciesRecurse(
  newDeps: { [packageName: string]: string } | undefined,
  promisesAtwork: Promise<Package>[],
  dependencies: Record<string, Package>,
) {
  for (const [name, range] of Object.entries(newDeps ?? {})) {
    const depnedenciesPromise = getDependencies(name, range);
    promisesAtwork.push(depnedenciesPromise);
    depnedenciesPromise.then((subDep) => {
      dependencies[name] = subDep;
    });
  }
  await Promise.all(promisesAtwork);
}

async function getNpmPackage(packageName: string): Promise<NPMPackage> {
  const npmPackage: NPMPackage = await got(
    `${process.env.REGISTRY_URL}/${packageName}`,
  ).json();

  return npmPackage;
}

const getNpmPackageMemoized = memoize(getNpmPackage, {
  promise: true,
  max: MEMOIZE_CACHE_SIZE,
  maxAge: MEMOIZE_MAX_AGE,
});
