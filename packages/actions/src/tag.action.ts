'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { getApiClient } from '@imkdw-dev/api-client';
import { ITagDto } from '@imkdw-dev/types';

export const getTagList = withErrorHandling(async () => {
  return getApiClient().get<ITagDto[]>(buildEndpoint('GET_TAG_LIST'));
});
