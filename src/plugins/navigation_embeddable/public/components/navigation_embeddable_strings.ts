/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';

export const NavEmbeddableStrings = {
  editor: {
    getAddButtonLabel: () =>
      i18n.translate('navigationEmbeddable.editor.addButtonLabel', {
        defaultMessage: 'Add link',
      }),
    getCancelButtonLabel: () =>
      i18n.translate('navigationEmbeddable.editor.cancelButtonLabel', {
        defaultMessage: 'Close',
      }),
    panelEditor: {
      getEmptyLinksMessage: () =>
        i18n.translate('navigationEmbeddable.panelEditor.emptyLinksMessage', {
          defaultMessage: "You haven't added any links yet.",
        }),
      getCreateFlyoutTitle: () =>
        i18n.translate('navigationEmbeddable.panelEditor.createFlyoutTitle', {
          defaultMessage: 'Create links panel',
        }),
      getSaveButtonLabel: () =>
        i18n.translate('navigationEmbeddable.panelEditor.saveButtonLabel', {
          defaultMessage: 'Save',
        }),
    },
    linkEditor: {
      getGoBackAriaLabel: () =>
        i18n.translate('navigationEmbeddable.linkEditor.goBackAriaLabel', {
          defaultMessage: 'Go back to panel editor.',
        }),
      getLinkTypePickerLabel: () =>
        i18n.translate('navigationEmbeddable.linkEditor.linkTypeFormLabel', {
          defaultMessage: 'Go to',
        }),
      getLinkDestinationLabel: () =>
        i18n.translate('navigationEmbeddable.linkEditor.linkDestinationLabel', {
          defaultMessage: 'Choose destination',
        }),
      getLinkTextLabel: () =>
        i18n.translate('navigationEmbeddable.linkEditor.linkTextLabel', {
          defaultMessage: 'Text (optional)',
        }),
      getLinkTextPlaceholder: () =>
        i18n.translate('navigationEmbeddable.linkEditor.linkTextPlaceholder', {
          defaultMessage: 'Enter text for link',
        }),
    },
  },
};
