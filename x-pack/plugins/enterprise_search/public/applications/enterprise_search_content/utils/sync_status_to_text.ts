/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

import { SyncJobType, SyncStatus } from '@kbn/search-connectors';

export function syncStatusToText(status: SyncStatus): string {
  switch (status) {
    case SyncStatus.COMPLETED:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.completed', {
        defaultMessage: 'Sync complete',
      });
    case SyncStatus.ERROR:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.error', {
        defaultMessage: 'Sync failure',
      });
    case SyncStatus.IN_PROGRESS:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.inProgress', {
        defaultMessage: 'Sync in progress',
      });
    case SyncStatus.CANCELED:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.canceling', {
        defaultMessage: 'Sync canceled',
      });
    case SyncStatus.CANCELING:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.canceled', {
        defaultMessage: 'Canceling sync',
      });
    case SyncStatus.PENDING:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.pending', {
        defaultMessage: 'Sync pending',
      });
    case SyncStatus.SUSPENDED:
      return i18n.translate('xpack.enterpriseSearch.content.syncStatus.suspended', {
        defaultMessage: 'Sync suspended',
      });
  }
}

export function syncStatusToColor(status: SyncStatus): string {
  switch (status) {
    case SyncStatus.COMPLETED:
      return 'success';
    case SyncStatus.ERROR:
    case SyncStatus.CANCELED:
      return 'danger';
    case SyncStatus.IN_PROGRESS:
    case SyncStatus.PENDING:
    case SyncStatus.SUSPENDED:
    case SyncStatus.CANCELING:
      return 'warning';
  }
}

export const syncJobTypeToText = (syncType: SyncJobType): string => {
  switch (syncType) {
    case SyncJobType.FULL:
      return i18n.translate('xpack.enterpriseSearch.content.syncJobType.full', {
        defaultMessage: 'Full content',
      });
    case SyncJobType.INCREMENTAL:
      return i18n.translate('xpack.enterpriseSearch.content.syncJobType.incremental', {
        defaultMessage: 'Incremental content',
      });
    default:
      return '';
  }
};
