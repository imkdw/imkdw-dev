'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import { ITagDto } from '@imkdw-dev/types';

export const getTagList = withErrorHandling(async () => {
  return apiClient.get<ITagDto[]>(buildEndpoint('GET_TAG_LIST'));
});
