/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { EuiFormRow } from '@elastic/eui';
import {
  DashboardDrilldownOptions,
  DashboardDrilldownOptionsComponent,
  DEFAULT_DASHBOARD_DRILLDOWN_OPTIONS,
} from '@kbn/presentation-util-plugin/public';
import {
  UrlDrilldownOptions,
  UrlDrilldownOptionsComponent,
  DEFAULT_URL_DRILLDOWN_OPTIONS,
} from '@kbn/ui-actions-enhanced-plugin/public';

import {
  NavigationLinkType,
  EXTERNAL_LINK_TYPE,
  DASHBOARD_LINK_TYPE,
  NavigationLinkOptions,
} from '../../../common/content_management';
import { NavEmbeddableStrings } from '../navigation_embeddable_strings';
import { NavigationEmbeddableUnorderedLink } from '../../editor/open_link_editor_flyout';

export const NavigationEmbeddableLinkOptions = ({
  link,
  setLinkOptions,
  selectedLinkType,
}: {
  selectedLinkType: NavigationLinkType;
  link?: NavigationEmbeddableUnorderedLink;
  setLinkOptions: (options: NavigationLinkOptions) => void;
}) => {
  const [dashboardLinkOptions, setDashboardLinkOptions] = useState<DashboardDrilldownOptions>({
    ...DEFAULT_DASHBOARD_DRILLDOWN_OPTIONS,
    ...(link && link.type === DASHBOARD_LINK_TYPE ? link.options : {}),
  });
  const [externalLinkOptions, setExternalLinkOptions] = useState<UrlDrilldownOptions>({
    ...DEFAULT_URL_DRILLDOWN_OPTIONS,
    ...(link && link.type === EXTERNAL_LINK_TYPE ? link.options : {}),
  });

  return (
    <EuiFormRow label={NavEmbeddableStrings.editor.linkEditor.getLinkOptionsLabel()}>
      {selectedLinkType === DASHBOARD_LINK_TYPE ? (
        <DashboardDrilldownOptionsComponent
          options={dashboardLinkOptions}
          onOptionChange={(change) => {
            setDashboardLinkOptions({ ...dashboardLinkOptions, ...change });
            setLinkOptions({ ...dashboardLinkOptions, ...change });
          }}
        />
      ) : (
        <UrlDrilldownOptionsComponent
          options={externalLinkOptions}
          onOptionChange={(change) => {
            setExternalLinkOptions({ ...externalLinkOptions, ...change });
            setLinkOptions({ ...externalLinkOptions, ...change });
          }}
        />
      )}
    </EuiFormRow>
  );
};
